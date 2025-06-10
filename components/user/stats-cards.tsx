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
  const dailyTotal = dailyStats.languages.reduce((acc, lang) => acc + Math.ceil(lang.timeSpent), 0);
  const weeklyTotal = weeklyStats.languages.reduce((acc, lang) => acc + lang.timeSpent, 0);

  return (
    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="bg-foreground/5 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold">Top Languages Today</h2>
          {/* <span className="text">Today</span> */}
        </div>
        {dailyStats.languages && dailyStats.languages.length > 0 ? (
          <div className="space-y-3">
            {dailyStats.languages.map((lang) => {
              const percentage = (lang.timeSpent / dailyTotal) * 100;
              const { bg: bgGradient, text: textColorClass } = generateColor(lang.language);
              const icon = getMDIIcon(lang.language as FileType);
              return (
                <div key={lang.language} className="w-full flex items-center h-10 group">
                  <span className="font-medium text-white drop-shadow-sm min-w-[110px] w-[110px]">{lang.language}</span>
                  <div className="relative flex-1 h-6 ml-4 rounded overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full rounded transition-all border"
                      style={{
                        width: `${Math.min(Math.max(10, percentage * 10 + 10, percentage), 100)}%`,
                        background: bgGradient,
                      }}
                    >
                      {/* <div className="w-1 h-full bg-white ml-auto" /> */}
                    </div>
                  </div>
                  <span className="ml-4 text-white/80 text-sm font-mono min-w-[60px] text-right">
                    {formatTimeSpent(lang.timeSpent)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground">No activity today</p>
        )}
      </div>

      <div className="bg-foreground/5 p-4 rounded-lg">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold">Top Languages This Week</h2>
          {/* <span className="text">Week</span> */}
        </div>
        {weeklyStats.languages && weeklyStats.languages.length > 0 ? (
          <div className="space-y-3">
            {weeklyStats.languages.map((lang) => {
              const percentage = (lang.timeSpent / weeklyTotal) * 100;
              const { bg: bgGradient, text: textColorClass } = generateColor(lang.language);
              const icon = getMDIIcon(lang.language as FileType);
              return (
                <div key={lang.language} className="w-full flex items-center h-10 group">
                  <span className="font-medium text-white drop-shadow-sm min-w-[110px] w-[110px]">{lang.language}</span>
                  <div className="relative flex-1 h-6 ml-4 rounded overflow-hidden">
                    <div
                      className="absolute left-0 top-0 h-full rounded transition-all border"
                      style={{
                        width: `${Math.min(Math.max(10, percentage * 10 + 10, percentage), 100)}%`,
                        background: bgGradient,
                      }}
                    >
                      {/* <div className="w-1 h-full bg-white ml-auto" /> */}
                    </div>
                  </div>
                  <span className="ml-4 text-white/80 text-sm font-mono min-w-[60px] text-right">
                    {formatTimeSpent(lang.timeSpent)}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-muted-foreground">No activity this week</p>
        )}
      </div>
    </div>
  );
}

export { StatsCardSkeleton }; 
