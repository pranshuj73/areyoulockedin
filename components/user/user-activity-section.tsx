"use client";

import { useEffect, useState, ReactNode } from "react";
import StreaksCard from "@/components/user/streaks-card";
import ActivityGraph from "@/components/user/activity-graph";
import { StreaksCardSkeleton } from "@/components/user/streaks-card";
import { Skeleton } from "@/components/ui/skeleton";

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
        <div className="bg-foreground/10 w-full h-32 rounded-sm">
          <div className="p-4 h-full">
            <div className="grid grid-cols-53 gap-1">
              {Array.from({ length: 365 }).map((_, i) => (
                <Skeleton key={i} className="size-3 rounded-sm" />
              ))}
            </div>
          </div>
        </div>
        {children}
        <StreaksCardSkeleton />
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-4">
      <ActivityGraph activity={data.activity} />
      {children}
      <StreaksCard currentStreak={data.currentStreak} longestStreak={data.longestStreak} />
    </div>
  );
} 
