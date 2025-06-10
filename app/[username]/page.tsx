import { getUserData, getUserDataDaily, getUserDataWeekly } from "@/lib/user";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { getMDIIcon } from "@/lib/language";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import type { FileType } from "@/types/lang";
import { generateColor } from "@/lib/color";
import { formatTimeSpent } from "@/lib/time";
import { Suspense } from "react";
import StatsCards, { StatsCardSkeleton } from "@/components/user/stats-cards";
import UserActivitySection from "@/components/user/user-activity-section";

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

export default async function Page({ params }: { params: Promise<{ username: string }> }) {
  const { username: paramUsername } = await params;
  const username = decodeURIComponent(paramUsername);
  if (!username.startsWith("@")) {
    notFound();
  }

  const { user } = await getUserData(username.slice(1));

  if (!user) {
    notFound();
  }

  // Fetch user's daily and weekly stats
  const dailyStats = await getUserDataDaily(user.id);
  const weeklyStats = await getUserDataWeekly(user.id);

  return (
    <main className="mt-32 p-6 sm:p-8 set-mw-center min-h-dvh">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
      >
        <ArrowLeft className="size-4" />
        Back to Leaderboard
      </Link>

      <UserActivitySection userId={user.id}>
        <div className="flex items-center w-full gap-1 mt-4">
          <Avatar className="rounded-full overflow-hidden size-13 ml-8 mr-3 border-2 border-background">
            <AvatarImage src={user.profilePictureUrl} />
            <AvatarFallback>{user.username.at(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-mono">@{user.username}</h1>
            <p className="text-sm text-muted-foreground">
              Locked in since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </UserActivitySection>

      <div className="mt-8">
        <Suspense fallback={<StatsCardSkeleton />}>
          <StatsCards dailyStats={dailyStats} weeklyStats={weeklyStats} />
        </Suspense>
      </div>
    </main>
  );
}
