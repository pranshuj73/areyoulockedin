import Leaderboard from "@/components/leaderboard";
import { LeaderboardEntry } from "@/types/leaderboard";
import Link from "next/link";

interface ApiResponse {
  data: LeaderboardEntry[];
  totalHeartbeatsReceived: number;
}

async function getLeaderboardData(): Promise<ApiResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"; // Use env var or fallback for local dev
  const apiUrl = `${baseUrl}/api/leaderboard`;

  try {
    console.log(`Fetching leaderboard data from: ${apiUrl}`);
    const res = await fetch(apiUrl, {
      next: {
        revalidate: 900, // Revalidate cache every 900 seconds (15 minutes)
        tags: ['leaderboard'],
      },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      const errorBody = await res.text();
      console.error("Error body:", errorBody);
      return { data: [], totalHeartbeatsReceived: -1 };
    }

    const result: ApiResponse = await res.json();

    if (!result || !Array.isArray(result.data)) {
      console.error("Invalid data structure received from API:", result);
      return { data: [], totalHeartbeatsReceived: -1 };
    }

    console.log(`Successfully fetched ${result.data.length} leaderboard entries.`);
    return result;

  } catch (error) {
    console.error("Failed to fetch leaderboard data:", error);
    return { data: [], totalHeartbeatsReceived: -1 };
  }
}

export default async function Home() {
  const { data, totalHeartbeatsReceived } = await getLeaderboardData();
  const top = data[0]

  return (
    <main className="mt-18 p-6 sm:p-8 min-h-dvh">
      <h1 className="text-center bg-clip-text bg-gradient-to-l from-neutral-400 dark:from-neutral-600 to-neutral-900 dark:to-neutral-100 text-transparent text-4xl font-semibold tracking-wide mt-8 mb-12">
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
      <Leaderboard data={data} />
      {data.length > 0 && (<p className="text-sm w-full text-center my-24">areyoulocked.in received {totalHeartbeatsReceived} requests today.</p>)}
    </main>
  );
}
