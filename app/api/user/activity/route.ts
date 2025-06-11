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
  const currentYear = now.getFullYear();
  
  // Create dates in local timezone
  const startOfYear = new Date(currentYear, 0, 1);
  const endOfYear = new Date(currentYear + 1, 0, 1);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

  console.log('Current year:', now.getFullYear());
  console.log('Start of year:', startOfYear.toISOString());
  console.log('End of year:', endOfYear.toISOString());

  // Fetch activity data for the current year up to today
  const activityData = await prisma.timeEntry.groupBy({
    by: ['timestamp'],
    where: {
      userId,
      timestamp: {
        gte: startOfYear,
        lte: endOfYear,
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

  // Create array with all days from start of year to end of year
  const allDays: { date: string; count: number }[] = [];
  const currentDate = new Date(startOfYear);
  
  // Add one more day to ensure we include December 31st
  const lastDate = new Date(endOfYear);
  lastDate.setDate(lastDate.getDate() + 1);
  
  while (currentDate < lastDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const isFutureDate = currentDate > today;
    
    // Ensure we only include dates from the current year
    if (dateStr.startsWith(currentYear.toString())) {
      allDays.push({
        date: dateStr,
        count: isFutureDate ? -1 : (dailyActivity.get(dateStr) || 0)
      });
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  console.log('First date in allDays:', allDays[0]?.date);
  console.log('Last date in allDays:', allDays[allDays.length - 1]?.date);

  // Calculate current streak
  let currentStreak = 0;
  let longestStreak = 0;
  let tempStreak = 0;

  // Calculate streaks
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
