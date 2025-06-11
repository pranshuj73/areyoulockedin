"use client";

import { cn } from "@/lib/utils";

interface ActivityData {
  date: string;
  count: number;
}

interface ActivityGraphProps {
  activity: ActivityData[];
}

export default function ActivityGraph({ activity }: ActivityGraphProps) {
  return (
    <div className="bg-foreground/10 rounded-sm">
      <div className="p-4">
        <div className="overflow-x-auto">
          <div
            className="grid gap-1"
            style={{
              gridTemplateColumns: 'repeat(53, 0.75rem)', // 0.75rem = 12px
              gridTemplateRows: 'repeat(7, 0.75rem)',
              gridAutoFlow: 'column'
            }}
          >
            {activity.map((day) => (
              <div
                key={day.date}
                className={cn(
                  "size-3 rounded transition-colors",
                  day.count > 0
                    ? "bg-cyan-500/50 hover:bg-cyan-500/100"
                    : day.count > -1 ? "bg-foreground/15 hover:bg-foreground/30" : "bg-foreground/5 hover:bg-foreground/20"
                )}
                title={`${day.date}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 
