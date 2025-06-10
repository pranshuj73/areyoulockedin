import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.userId;

    // 2. Calculate the timeframe (last 7 days)
    const now = Date.now();
    const timeframe = new Date(now - 7 * 24 * 60 * 60 * 1000);

    // 3. Aggregate time spent per language for this user in the last 7 days
    const languageAggregation = await prisma.timeEntry.groupBy({
      by: ['language'],
      where: {
        userId: userId,
        timestamp: {
          gte: timeframe,
        },
      },
      _sum: {
        timeSpent: true,
      },
    });

    // 4. Prepare the response data and sort by time spent
    const languages = languageAggregation
      .map(entry => ({
        language: entry.language,
        timeSpent: entry._sum.timeSpent ?? 0,
      }))
      .sort((a, b) => b.timeSpent - a.timeSpent); // Sort in descending order

    const responseData = { languages };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Error fetching user weekly language aggregation:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: 'Failed to fetch user weekly language aggregation', details: errorMessage }, { status: 500 });
  }
}
