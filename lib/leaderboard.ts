import { LeaderboardApiResponse } from "@/types/leaderboard";

export async function getLeaderboardData(timeframe: "daily" | "weekly"): Promise<LeaderboardApiResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"; // Use env var or fallback for local dev
  const apiUrl = `${baseUrl}/api/leaderboard?timeframe=${timeframe}`;

  try {
    console.log(`Fetching leaderboard data from: ${apiUrl}`);
    const res = await fetch(apiUrl, {
      next: {
        revalidate: 900, // Revalidate cache every 900 seconds (15 minutes)
        tags: [`leaderboard-${timeframe}`],
      },
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      console.error(`API Error: ${res.status} ${res.statusText}`);
      const errorBody = await res.text();
      console.error("Error body:", errorBody);
      return { data: [], totalHeartbeatsReceived: -1 };
    }

    const result: LeaderboardApiResponse = await res.json();

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
