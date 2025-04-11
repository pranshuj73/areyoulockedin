import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { getLanguage } from '@/lib/language';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { sessionKey, timeSpent, extension, timestamp } = await request.json();
    console.log(`received ${timeSpent}m for ext:${extension} by key:${sessionKey} at ${timestamp}`);

    if (!sessionKey || !timeSpent || !extension || !timestamp) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const language = getLanguage(extension);

    if (!language) {
      console.log("Unsupported file extension [Language could not be inferred]:", extension)
      return NextResponse.json({ error: `Unsupported file extension [Language could not be inferred]: ${extension}` }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { sessionKey },
    });

    if (!user) {
      console.log("Invalid session key", sessionKey)
      return NextResponse.json({ error: 'Invalid session key' }, { status: 401 });
    }

    const roundedTimeSpent = Math.ceil(parseFloat(timeSpent) * 100) / 100;

    const timeEntry = await prisma.timeEntry.create({
      data: {
        userId: user.id,
        sessionKey,
        timeSpent: roundedTimeSpent,
        language: language, // Use the sent language directly
        timestamp: new Date(timestamp),
      },
    });

    return NextResponse.json({ message: 'Time recorded', timeEntry }, { status: 200 });
  } catch (error) {
    console.error('Error saving time entry:', error);
    return NextResponse.json({ error: 'Failed to save time data' }, { status: 500 });
  }
}
