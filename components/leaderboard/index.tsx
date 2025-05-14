import Table from "@/components/leaderboard/table";
import { LeaderboardApiResponse } from "@/types/leaderboard";
import Link from "next/link";

interface LeaderboardProps extends LeaderboardApiResponse {
  timeframe: "daily" | "weekly";
}

export default async function Leaderboard({ data, totalHeartbeatsReceived, timeframe }: LeaderboardProps) {
  const top = data[0]

  return (
    <main className="mt-18 p-6 sm:p-8 min-h-dvh">
      <h1 className="text-center bg-clip-text bg-gradient-to-l from-neutral-400 dark:from-neutral-600 to-neutral-900 dark:to-neutral-100 text-transparent text-4xl font-semibold tracking-wide leading-normal px-4 py-2 mt-8 mb-12">
        Are you as locked in as{" "}
        <Link
          className={
            "hover:bg-foreground/10 w-min hover:px-4 py-2 rounded-full transition-all duration-300 ease-out"
            + ""
          }
          href={`https://x.com/${top.username}`}
          target="_blank"
        >
          @{top.username}
        </Link>
        {" "}?
      </h1>
      <Table data={data} timeframe={timeframe} />
      {data.length > 0 && (<p className="text-sm w-full text-center my-24">areyoulocked.in received {totalHeartbeatsReceived} requests today.</p>)}
    </main>
  );
}
