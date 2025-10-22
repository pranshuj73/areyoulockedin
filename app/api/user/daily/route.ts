import { NextRequest, NextResponse } from 'next/server';
import { analyticsDb } from '@/lib/db';


export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const userId = body.userId;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Get daily stats for today
    const dailyStats = await analyticsDb.dailyStats.findFirst({
      where: {
        userId: userId,
        date: today,
      },
    });

    // Extract languages from JSON and convert to array
    const languagesData = dailyStats?.languages as Record<string, number> || {};
    const languages = Object.entries(languagesData)
      .map(([language, timeSpent]) => ({
        language,
        timeSpent,
      }))
      .sort((a, b) => b.timeSpent - a.timeSpent); // Sort in descending order

    const responseData = {
      languages,
    };

    return NextResponse.json(responseData, { status: 200 });
  } catch (error) {
    console.error('Error fetching user daily language aggregation:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: 'Failed to fetch user daily language aggregation', details: errorMessage }, { status: 500 });
  }
}
