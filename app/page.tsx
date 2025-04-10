import Leaderboard from "@/components/leaderboard";
import { LeaderboardEntry } from "@/types/leaderboard";

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
      return {data: [], totalHeartbeatsReceived: -1};
    }

    const result: ApiResponse = await res.json();

    if (!result || !Array.isArray(result.data)) {
        console.error("Invalid data structure received from API:", result);
        return {data: [], totalHeartbeatsReceived: -1};
    }

    console.log(`Successfully fetched ${result.data.length} leaderboard entries.`);
    return result;

  } catch (error) {
    console.error("Failed to fetch leaderboard data:", error);
    return {data: [], totalHeartbeatsReceived: -1};
  }
}

export default async function Home() {
  const {data, totalHeartbeatsReceived} = await getLeaderboardData();

  return (
    <main className="mt-18 p-8 min-h-dvh">
      <h1 className="text-2xl font-bold mb-6">Today's Leaderboard</h1>
      <Leaderboard data={data} totalHeartbeatsReceived={totalHeartbeatsReceived} />
    </main>
  );
}
