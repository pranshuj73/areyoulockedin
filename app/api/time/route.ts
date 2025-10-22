import { NextRequest, NextResponse } from 'next/server';
import { getIngestDb, analyticsDb } from '@/lib/db';
import { getLanguage } from '@/lib/language';
import { AGGREGATION_CONFIG, getSessionCacheExpiry } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const { sessionKey, timeSpent, extension, timestamp } = await request.json();
    console.log(`received ${timeSpent}m for ext:${extension} by key:${sessionKey} at ${timestamp}`);

    if (!sessionKey || !timeSpent || !extension || extension === 'unknown' || !timestamp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (new Date(timestamp) > new Date(Date.now()) && new Date(timestamp) < new Date(Date.now() - 24 * 60 * 60 * 1000)) {
      console.log('timestamp cannot be in the future');
      return NextResponse.json({ error: 'Invalid timestamp received.' }, { status: 400 });
    }

    if (timeSpent < 0 || timeSpent > AGGREGATION_CONFIG.MAX_TIME_PER_EVENT) {
      return NextResponse.json({ error: 'Invalid time chunk received.' }, { status: 400 });
    }

    const language = getLanguage(extension);

    if (!language) {
      console.log("Unsupported file extension [Language could not be inferred]:", extension)
      return NextResponse.json({ error: `Unsupported file extension [Language could not be inferred]: ${extension}` }, { status: 400 });
    }

    // Check session cache in IngestDB first (faster)
    const ingestDb = await getIngestDb();
    const sessionCache = await ingestDb.sessionCache.findUnique({
      where: { sessionKey },
    });

    let userId: string;
    let username: string;

    if (!sessionCache || sessionCache.banned || sessionCache.expiresAt < new Date()) {
      // Session not found or expired, check AnalyticsDB for user data
      const user = await analyticsDb.user.findUnique({
        where: {
          sessionKey,
          banned: false
        },
      });

      if (!user) {
        console.log("Invalid session key", sessionKey);
        return NextResponse.json({ error: 'Invalid session key' }, { status: 401 });
      }

      userId = user.id;
      username = user.username;

      // Update session cache
      await ingestDb.sessionCache.upsert({
        where: { sessionKey },
        create: {
          sessionKey,
          userId: user.id,
          username: user.username,
          banned: user.banned,
          expiresAt: getSessionCacheExpiry(),
        },
        update: {
          userId: user.id,
          username: user.username,
          banned: user.banned,
          expiresAt: getSessionCacheExpiry(),
        },
      });
    } else {
      userId = sessionCache.userId;
      username = sessionCache.username;
    }

    const roundedTimeSpent = Math.ceil(parseFloat(timeSpent) * 100) / 100;

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
    const entriesInLastHour = await ingestDb.activityEvent.aggregate({
      _sum: { timeSpent: true },
      where: {
        userId: userId,
        timestamp: { gte: oneHourAgo },
      },
    });
    const totalTimeInLastHour = entriesInLastHour._sum.timeSpent || 0;

    if (totalTimeInLastHour + roundedTimeSpent > AGGREGATION_CONFIG.MAX_TIME_PER_HOUR) { // Max time per hour from config
      console.log(`User ${userId} exceeded time limit in last hour.`);
      return NextResponse.json({ error: 'Time logging limit exceeded for the period.' }, { status: 429 });
    }

    // Write to IngestDB (Turso) for fast ingestion
    const activityEvent = await ingestDb.activityEvent.create({
      data: {
        userId: userId,
        sessionKey,
        timeSpent: roundedTimeSpent,
        language: language,
        extension: extension,
        timestamp: new Date(timestamp),
      },
    });

    return NextResponse.json({ message: 'Time recorded', activityEvent }, { status: 200 });
  } catch (error) {
    console.error('Error saving time entry:', error);
    return NextResponse.json({ error: 'Failed to save time data' }, { status: 500 });
  }
}
