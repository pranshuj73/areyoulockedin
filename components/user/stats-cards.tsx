"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { getMDIIcon } from "@/lib/language";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import type { FileType } from "@/types/lang";
import { generateColor } from "@/lib/color";
import { formatTimeSpent } from "@/lib/time";

interface LanguageStatProps {
  language: string;
  timeSpent: number;
}

function LanguageStat({ language, timeSpent }: LanguageStatProps) {
  const { bg: bgGradient, text: textColorClass } = generateColor(language);
  const icon = getMDIIcon(language as FileType);

  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-3">
        <div 
          className="size-5 rounded-md flex items-center justify-center transition-colors"
          style={{ backgroundImage: bgGradient }}
        >
          <Icon
            icon={`mdi:${icon}`}
            className={cn("size-4", textColorClass)}
          />
        </div>
        <span className="font-medium">{language}</span>
      </div>
      <span className="text-muted-foreground transition-colors group-hover:text-foreground">
        {formatTimeSpent(timeSpent)}
      </span>
    </div>
  );
}

function StatsCardSkeleton() {
  return (
    <div className="bg-foreground/5 p-4 rounded-lg">
      <Skeleton className="h-7 w-32 mb-4" />
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="size-5 rounded-md" />
              <Skeleton className="h-5 w-24" />
            </div>
            <Skeleton className="h-5 w-16" />
          </div>
        ))}
      </div>
    </div>
  );
}

interface StatsCardsProps {
  dailyStats: {
    languages: { language: string; timeSpent: number }[];
  };
  weeklyStats: {
    languages: { language: string; timeSpent: number }[];
  };
}

export default function StatsCards({ dailyStats, weeklyStats }: StatsCardsProps) {
  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-foreground/5 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">Today's Stats</h2>
        {dailyStats.languages && dailyStats.languages.length > 0 ? (
          <div className="space-y-3">
            {dailyStats.languages.map((lang) => (
              <LanguageStat 
                key={lang.language}
                language={lang.language}
                timeSpent={lang.timeSpent}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No activity today</p>
        )}
      </div>

      <div className="bg-foreground/5 p-4 rounded-lg">
        <h2 className="text-lg font-semibold mb-4">This Week's Stats</h2>
        {weeklyStats.languages && weeklyStats.languages.length > 0 ? (
          <div className="space-y-3">
            {weeklyStats.languages.map((lang) => (
              <LanguageStat 
                key={lang.language}
                language={lang.language}
                timeSpent={lang.timeSpent}
              />
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No activity this week</p>
        )}
      </div>
    </div>
  );
}

export { StatsCardSkeleton }; 