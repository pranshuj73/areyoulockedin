import { NextRequest, NextResponse } from 'next/server';
import { analyticsDb } from '@/lib/db';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.userId;

    // Calculate the start of the current week (Monday)
    const now = new Date();
    const dayOfWeek = now.getDay();
    const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    const weekStart = new Date(now);
    weekStart.setDate(weekStart.getDate() - daysToMonday);
    weekStart.setHours(0, 0, 0, 0);

    // Get weekly stats for the current week
    const weeklyStats = await analyticsDb.weeklyStats.findFirst({
      where: {
        userId: userId,
        weekStart: weekStart,
      },
    });

    // Extract languages from JSON and convert to array
    const languagesData = weeklyStats?.languages as Record<string, number> || {};
    const languages = Object.entries(languagesData)
      .map(([language, timeSpent]) => ({
        language,
        timeSpent,
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
