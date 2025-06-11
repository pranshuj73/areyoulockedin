"use client";

import { useEffect, useState, ReactNode } from "react";
import ActivityGraph from "@/components/user/activity-graph";
import { Skeleton } from "@/components/ui/skeleton";
import { FlameIcon, TrophyIcon } from "lucide-react";

interface ActivityData {
  date: string;
  count: number;
}

interface UserActivitySectionProps {
  userId: string;
  children: ReactNode;
}

export default function UserActivitySection({ userId, children }: UserActivitySectionProps) {
  const [data, setData] = useState<{ currentStreak: number; longestStreak: number; activity: ActivityData[] } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivity() {
      try {
        const response = await fetch(`/api/user/activity?userId=${userId}`, {
          next: {
            revalidate: 43200, // 12 hours in seconds
            tags: [`user-activity-${userId}`],
          }
        });
        if (!response.ok) throw new Error('Failed to fetch activity data');
        const activityData = await response.json();
        setData(activityData);
      } catch (error) {
        console.error('Error fetching activity data:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchActivity();
  }, [userId]);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="bg-foreground/10 w-full rounded-sm">
          <div className="p-4 h-full">
            <div className="overflow-x-auto">
              <div
                className="grid gap-1"
                style={{
                  gridTemplateColumns: 'repeat(53, 0.75rem)', // 0.75rem = 12px
                  gridTemplateRows: 'repeat(7, 0.75rem)',
                  gridAutoFlow: 'column'
                }}
              >
                {Array.from({ length: 365 }).map((_, i) => (
                  <Skeleton key={i} className="size-3 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 w-full mt-8">
          {children}

          <div className="flex flex-nowrap gap-8 w-full md:w-fit text-nowrap">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-orange-500/10">
                <FlameIcon className="size-6 text-orange-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium">
                  <Skeleton className="w-14 h-5 mb-2" />
                </span>
                <span className="text-sm text-muted-foreground">Current Streak</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-yellow-500/10">
                <TrophyIcon className="size-6 text-yellow-500" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-medium">
                  <Skeleton className="w-14 h-5 mb-2" />
                </span>
                <span className="text-sm text-muted-foreground">Longest Streak</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-4">
      <ActivityGraph activity={data.activity} />
      <div className="flex flex-col md:flex-row md:items-center justify-center gap-4 w-full mt-8">
        {children}

        <div className="flex flex-nowrap gap-8 w-full md:w-fit text-nowrap">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-orange-500/10">
              <FlameIcon className="size-6 text-orange-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium">
                {data.currentStreak} day{data.currentStreak !== 1 ? 's' : ''}
              </span>
              <span className="text-sm text-muted-foreground">Current Streak</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-yellow-500/10">
              <TrophyIcon className="size-6 text-yellow-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-medium">
                {data.longestStreak} day{data.longestStreak !== 1 ? 's' : ''}
              </span>
              <span className="text-sm text-muted-foreground">Longest Streak</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
