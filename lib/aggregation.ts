import { getIngestDb, analyticsDb } from './db';
import { AGGREGATION_CONFIG, getCutoffTime, getSessionCacheExpiry } from './config';

interface LanguageBreakdown {
  [language: string]: number;
}

interface DailyAggregation {
  userId: string;
  date: string;
  totalTime: number;
  languages: LanguageBreakdown;
  heartbeats: number;
}

interface WeeklyAggregation {
  userId: string;
  weekStart: string;
  totalTime: number;
  languages: LanguageBreakdown;
  heartbeats: number;
}

/**
 * Aggregates activity events from IngestDB and writes to AnalyticsDB
 * This should be run every 5-10 minutes as a background job
 */
export async function aggregateActivityData() {
  console.log('Starting activity data aggregation...');
  
  try {
    // Get events from the configured cutoff time to ensure we don't miss any
    const cutoffTime = getCutoffTime();
    const ingestDb = await getIngestDb();
    
    // Get all events that haven't been processed yet
    const events = await ingestDb.activityEvent.findMany({
      where: {
        createdAt: {
          gte: cutoffTime,
        },
      },
      orderBy: {
        timestamp: 'asc',
      },
    });

    if (events.length === 0) {
      console.log('No new events to aggregate');
      return;
    }

    console.log(`Processing ${events.length} events`);

    // Group events by user and date
    const dailyGroups = new Map<string, DailyAggregation>();
    const weeklyGroups = new Map<string, WeeklyAggregation>();

    for (const event of events) {
      const eventDate = new Date(event.timestamp);
      const dateStr = eventDate.toISOString().split('T')[0];
      
      // Calculate week start (Monday)
      const weekStart = new Date(eventDate);
      const dayOfWeek = weekStart.getDay();
      const daysToMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
      weekStart.setDate(weekStart.getDate() - daysToMonday);
      weekStart.setHours(0, 0, 0, 0);
      const weekStartStr = weekStart.toISOString().split('T')[0];

      // Daily aggregation
      const dailyKey = `${event.userId}-${dateStr}`;
      if (!dailyGroups.has(dailyKey)) {
        dailyGroups.set(dailyKey, {
          userId: event.userId,
          date: dateStr,
          totalTime: 0,
          languages: {},
          heartbeats: 0,
        });
      }
      
      const daily = dailyGroups.get(dailyKey)!;
      daily.totalTime += event.timeSpent;
      daily.heartbeats += 1;
      daily.languages[event.language] = (daily.languages[event.language] || 0) + event.timeSpent;

      // Weekly aggregation
      const weeklyKey = `${event.userId}-${weekStartStr}`;
      if (!weeklyGroups.has(weeklyKey)) {
        weeklyGroups.set(weeklyKey, {
          userId: event.userId,
          weekStart: weekStartStr,
          totalTime: 0,
          languages: {},
          heartbeats: 0,
        });
      }
      
      const weekly = weeklyGroups.get(weeklyKey)!;
      weekly.totalTime += event.timeSpent;
      weekly.heartbeats += 1;
      weekly.languages[event.language] = (weekly.languages[event.language] || 0) + event.timeSpent;
    }

    // Write daily aggregations to AnalyticsDB
    for (const [key, daily] of dailyGroups) {
      await analyticsDb.dailyStats.upsert({
        where: {
          userId_date: {
            userId: daily.userId,
            date: new Date(daily.date),
          },
        },
        create: {
          userId: daily.userId,
          date: new Date(daily.date),
          totalTime: daily.totalTime,
          languages: daily.languages,
          heartbeats: daily.heartbeats,
        },
        update: {
          totalTime: { increment: daily.totalTime },
          languages: daily.languages, // This will merge with existing data
          heartbeats: { increment: daily.heartbeats },
        },
      });

      // Update user activity tracking
      await analyticsDb.userActivity.upsert({
        where: {
          userId_date: {
            userId: daily.userId,
            date: new Date(daily.date),
          },
        },
        create: {
          userId: daily.userId,
          date: new Date(daily.date),
          isActive: true,
          totalTime: daily.totalTime,
        },
        update: {
          isActive: true,
          totalTime: { increment: daily.totalTime },
        },
      });
    }

    // Write weekly aggregations to AnalyticsDB
    for (const [key, weekly] of weeklyGroups) {
      await analyticsDb.weeklyStats.upsert({
        where: {
          userId_weekStart: {
            userId: weekly.userId,
            weekStart: new Date(weekly.weekStart),
          },
        },
        create: {
          userId: weekly.userId,
          weekStart: new Date(weekly.weekStart),
          totalTime: weekly.totalTime,
          languages: weekly.languages,
          heartbeats: weekly.heartbeats,
        },
        update: {
          totalTime: { increment: weekly.totalTime },
          languages: weekly.languages, // This will merge with existing data
          heartbeats: { increment: weekly.heartbeats },
        },
      });
    }

    // Clean up processed events from IngestDB (optional - for storage management)
    if (AGGREGATION_CONFIG.CLEANUP_PROCESSED_EVENTS) {
      const processedEventIds = events.map((e: any) => e.id);
      await ingestDb.activityEvent.deleteMany({
        where: {
          id: {
            in: processedEventIds,
          },
        },
      });
    }

    console.log(`Successfully aggregated ${events.length} events into ${dailyGroups.size} daily and ${weeklyGroups.size} weekly records`);
    
  } catch (error) {
    console.error('Error during aggregation:', error);
    throw error;
  }
}

/**
 * Clean up expired session cache entries
 */
export async function cleanupSessionCache() {
  try {
    const ingestDb = await getIngestDb();
    const expiredCount = await ingestDb.sessionCache.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
    
    console.log(`Cleaned up ${expiredCount.count} expired session cache entries`);
  } catch (error) {
    console.error('Error cleaning up session cache:', error);
  }
}

/**
 * Get user activity data for streak calculation
 */
export async function getUserActivityData(userId: string, startDate: Date, endDate: Date) {
  return await analyticsDb.userActivity.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    orderBy: {
      date: 'asc',
    },
  });
}
