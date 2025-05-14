import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const now = Date.now();
    let timeframe = new Date(now - 24 * 60 * 60 * 1000);

    const timeframeParam = request.nextUrl.searchParams.get('timeframe') ?? 'daily';
    if (timeframeParam === 'weekly') {
      timeframe = new Date(now - 7 * 24 * 60 * 60 * 1000);
    }

    // 1. Aggregate time spent and count, grouping by userId
    const aggregatedData = await prisma.timeEntry.groupBy({
      by: ['userId'],
      where: {
        timestamp: {
          gte: timeframe,
        },
      },
      _sum: {
        timeSpent: true,
      },
      _count: {
        _all: true, // Count all entries per user (heartbeats)
      },
      orderBy: {
        _sum: {
          timeSpent: 'desc',
        },
      },
    });

    if (aggregatedData.length === 0) {
      const responseData = { data: [], totalHeartbeatsReceived: 0 };
      return NextResponse.json(responseData, { status: 200 });
    }

    // Calculate total heartbeats from the first aggregation result
    const totalHeartbeatsReceived = aggregatedData.reduce(
        (sum, agg) => sum + agg._count._all, 0
    );

    // 2. Get the User IDs from the aggregation results
    const userIds = aggregatedData.map(item => item.userId);

    // 3. Fetch user details (username, profile picture) for these specific users
    //    NO nested time entry selection here.
    const users = await prisma.user.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
      select: {
        id: true,
        username: true,
        profilePictureUrl: true,
      },
    });

    // 4. Fetch distinct languages and their total time spent for these users within the time frame
    const languageData = await prisma.timeEntry.groupBy({
      by: ['userId', 'language'],
      where: {
        userId: {
          in: userIds,
        },
        timestamp: {
          gte: timeframe,
        },
      },
      _sum: {
        timeSpent: true, // Aggregate total time spent per language
      },
    });

    // 5. Create maps for efficient lookup
    const userMap = new Map(users.map(user => [user.id, user]));
    const languageMap = new Map<string, { language: string; timeSpent: number }[]>(); // Map<userId, Array<{ language, timeSpent }>>

    // Populate the language map
    for (const entry of languageData) {
      if (!languageMap.has(entry.userId)) {
        languageMap.set(entry.userId, []);
      }
      languageMap.get(entry.userId)?.push({
        language: entry.language,
        timeSpent: entry._sum.timeSpent ?? 0,
      });
    }

    // Sort languages by time spent for each user
    for (const [_userId, languages] of languageMap.entries()) {
      languages.sort((a, b) => b.timeSpent - a.timeSpent); // Sort descending by time spent
    }


    // 6. Combine aggregated data with user details and languages
    const leaderboard = aggregatedData.map(agg => {
      const user = userMap.get(agg.userId);
      if (!user) return null; // Should not happen if DB is consistent

      const languages = (languageMap.get(agg.userId) ?? []).map(lang => lang.language); // Extract only language names

      return {
        userId: user.id,
        username: user.username,
        profilePictureUrl: user.profilePictureUrl ?? null,
        totalTimeSpent: agg._sum.timeSpent ?? 0,
        languages: languages.slice(0, 7),
      };
    }).filter(item => item !== null); // Filter out any potential nulls

    const responseData = { data: leaderboard, totalHeartbeatsReceived };

    return NextResponse.json(responseData, { status: 200 });

  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: 'Failed to fetch leaderboard data', details: errorMessage }, { status: 500 });
  } finally {
    // await prisma.$disconnect(); // Generally not needed in serverless environments
  }
}
