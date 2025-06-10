import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  // Get start of year and current date
  const now = new Date();
  const startOfYear = new Date(now.getFullYear(), 0, 1); // January 1st
  const endOfToday = new Date(now);
  endOfToday.setHours(23, 59, 59, 999);

  // Fetch activity data for the current year up to today
  const activityData = await prisma.timeEntry.groupBy({
    by: ['timestamp'],
    where: {
      userId,
      timestamp: {
        gte: startOfYear,
        lte: endOfToday,
      },
    },
    _count: {
      timestamp: true,
    },
  });

  // Group by date and sum the counts
  const dailyActivity = new Map<string, number>();
  activityData.forEach(entry => {
    const date = entry.timestamp.toISOString().split('T')[0];
    dailyActivity.set(date, (dailyActivity.get(date) || 0) + entry._count.timestamp);
  });

  // Create array with all days from start of year to today
  const allDays: { date: string; count: number }[] = [];
  const currentDate = new Date(startOfYear);
  
  while (currentDate <= endOfToday) {
    const dateStr = currentDate.toISOString().split('T')[0];
    allDays.push({
      date: dateStr,
      count: dailyActivity.get(dateStr) || 0
    });
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Calculate current streak
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Calculate streaks
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayStr = today.toISOString().split('T')[0];
  const yesterdayStr = new Date(today.getTime() - 24 * 60 * 60 * 1000).toISOString().split('T')[0];

  for (let i = 0; i < allDays.length; i++) {
    const currentDay = allDays[i];
    const prevDay = i > 0 ? allDays[i - 1] : null;

    if (currentDay.count > 0) {
      if (i === 0 || (prevDay && prevDay.count > 0)) {
        tempStreak++;
      } else {
        tempStreak = 1;
      }

      if (tempStreak > longestStreak) {
        longestStreak = tempStreak;
      }

      // Check if this is part of the current streak
      if (currentDay.date === todayStr || currentDay.date === yesterdayStr) {
        currentStreak = tempStreak;
      }
    } else {
      tempStreak = 0;
    }
  }

  return NextResponse.json({
    currentStreak,
    longestStreak,
    activity: allDays,
  });
} 