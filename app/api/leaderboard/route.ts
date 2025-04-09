import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const now = new Date();
    const twentyFourHoursAgo = new Date(Date.UTC(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds()
    ) - 24 * 60 * 60 * 1000);

    // 1. Aggregate time spent, grouping by userId (which is the Clerk ID)
    const aggregatedData = await prisma.timeEntry.groupBy({
      by: ['userId'], // Group by the Clerk User ID stored in TimeEntry.userId
      where: {
        timestamp: {
          gte: twentyFourHoursAgo,
        },
      },
      _sum: {
        timeSpent: true,
      },
      orderBy: {
        _sum: {
          timeSpent: 'desc',
        },
      },
      take: 100 // Optional: Limit
    });

    if (aggregatedData.length === 0) {
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    // 2. Get the User IDs (Clerk IDs) from the aggregation results
    const userIds = aggregatedData.map(item => item.userId);

    // 3. Fetch user details using their Clerk IDs (which are the User.id now)
    const users = await prisma.user.findMany({
      where: {
        id: { // Querying User table by its 'id' field (the Clerk ID)
          in: userIds,
        },
      },
      select: {
        id: true, // Select the User ID (Clerk ID)
        username: true,
        profilePictureUrl: true,
        // Select related time entries to get distinct languages
        timeEntries: {
          where: {
            timestamp: {
              gte: twentyFourHoursAgo,
            },
          },
          select: {
            language: true,
          },
          distinct: ['language'],
        },
      },
    });

    // 4. Create a map for easy lookup by userId (Clerk ID)
    const userMap = new Map(users.map(user => [user.id, user]));

    // 5. Combine aggregated data with user details
    const leaderboard = aggregatedData.map(agg => {
      const user = userMap.get(agg.userId); // Lookup using the Clerk ID
      if (!user) return null;

      const languages = user.timeEntries.map(entry => entry.language);

      return {
        userId: user.id,
        username: user.username,
        profilePictureUrl: user.profilePictureUrl ?? null,
        totalTimeSpent: agg._sum.timeSpent ?? 0,
        languages: languages,
      };
    }).filter(item => item !== null);

    return NextResponse.json({ data: leaderboard }, { status: 200 });

  } catch (error) {
    console.error('Error fetching leaderboard data:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: 'Failed to fetch leaderboard data', details: errorMessage }, { status: 500 });
  } finally {
    // await prisma.$disconnect(); // Optional
  }
}
