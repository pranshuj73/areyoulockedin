import Leaderboard from "@/components/leaderboard";
import { LeaderboardEntry } from "@/types/leaderboard";

interface ApiResponse {
  data: LeaderboardEntry[];
}

async function getLeaderboardData(): Promise<LeaderboardEntry[]> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"; // Use env var or fallback for local dev
  const apiUrl = `${baseUrl}/api/leaderboard`;

  try {
    console.log(`Fetching leaderboard data from: ${apiUrl}`);
    const res = await fetch(apiUrl, {
      next: {
        revalidate: 600, // Revalidate cache every 600 seconds (10 minutes)
        tags: ['leaderboard'],
      },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      const errorBody = await res.text();
      console.error("Error body:", errorBody);
      return [];
    }

    const result: ApiResponse = await res.json();

    if (!result || !Array.isArray(result.data)) {
        console.error("Invalid data structure received from API:", result);
        return [];
    }

    console.log(`Successfully fetched ${result.data.length} leaderboard entries.`);
    return result.data;

  } catch (error) {
    console.error("Failed to fetch leaderboard data:", error);
    return [];
  }
}

export default async function Home() {
  const leaderboardData = await getLeaderboardData();

  return (
    <main className="mt-18 p-8 min-h-dvh">
      <h1 className="text-2xl font-bold mb-6">Leaderboard</h1>
      <Leaderboard data={leaderboardData} />
    </main>
  );
}
