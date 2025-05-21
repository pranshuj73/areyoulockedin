"use client";

import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import { LeaderboardEntry } from "@/types/leaderboard";

export default function UserRank({ data }: { data: LeaderboardEntry[] }) {
  function handleScrollToUser(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (disabled) return;

    const id = `#${username}`;
    const el = document.querySelector(id);
    if (!el) return;

    // Scroll to center
    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Temporary highlight
    const highlightClasses = ['bg-blue-100/50', 'dark:bg-blue-100/10']
    el.classList.add(...highlightClasses);
    setTimeout(() => {
      el.classList.remove(...highlightClasses);
    }, 1000);
  }

  const { isLoaded, isSignedIn, user } = useUser();
  if (!(isLoaded && isSignedIn && user && user.username)) {
    return null;
  }

  const { username, imageUrl: pfp } = user;
  const rank = data.findIndex((entry) => entry.username === username);

  const disabled = rank === -1
  const formattedRank = !disabled ? "Currently #" + String(rank + 1).padStart(3, "0") : "Currently UNRANKED";

  return (
    <button className={cn(
      "group fixed bottom-20 right-4 p-2 pr-4",
      "bg-background/70 hover:bg-accent/70 backdrop-blur-md border border-neutral-200 dark:border-neutral-700 rounded-full",
      "transition-all duration-300 ease-in-out",
      "flex items-center justify-start gap-2 overflow-hidden",
      (disabled ? "pointer-events-none" : "cursor-pointer")
    )}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : undefined}
      onClick={handleScrollToUser}
    >
      <Avatar className="relative">
        <div className={cn(
          "absolute top-1/2 left-1/2 -translate-1/2 opacity-0 group-hover:opacity-100 z-50",
          "size-8  bg-blue-400 flex items-center justify-center overflow-hidden rounded-full",
          "transition-all duration-100 ease-in"
        )}>

          <ArrowUpRight className="mt-4 mr-4 group-hover:mt-0 group-hover:mr-0 size-5 text-foreground transition-all duration-100 ease-in" />
        </div>
        <AvatarImage src={pfp} />
        <AvatarFallback>{username.at(0)}</AvatarFallback>
      </Avatar>
      <span className="text-nowrap text-accent-foreground/80 font-semibold text-sm">{formattedRank}</span>
    </button >
  )
}
