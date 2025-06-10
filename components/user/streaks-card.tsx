"use client";

import { Flame, Trophy, Clock, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreaksCardProps {
  currentStreak: number;
  longestStreak: number;
}

export function StreaksCardSkeleton() {
  return (
    <div className="bg-foreground/10 rounded-sm p-4">
      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4">
            <span className="h-12 w-12 bg-muted rounded-full animate-pulse" />
            <div className="flex flex-col gap-1">
              <span className="h-4 w-20 bg-muted rounded animate-pulse" />
              <span className="h-7 w-24 bg-muted rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function StreaksCard({ currentStreak, longestStreak }: StreaksCardProps) {
  return (
    <div className="bg-foreground/10 rounded-sm p-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-blue-500/10">
            <Clock className="size-6 text-blue-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Most Active</span>
            <span className="text-lg font-medium">Weekend</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-purple-500/10">
            <Calendar className="size-6 text-purple-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Best Time</span>
            <span className="text-lg font-medium">Evening</span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-orange-500/10">
            <Flame className="size-6 text-orange-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Current Streak</span>
            <span className="text-lg font-medium">
              {currentStreak} day{currentStreak !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-yellow-500/10">
            <Trophy className="size-6 text-yellow-500" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm text-muted-foreground">Longest Streak</span>
            <span className="text-lg font-medium">
              {longestStreak} day{longestStreak !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
} 