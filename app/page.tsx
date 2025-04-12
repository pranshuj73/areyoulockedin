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
    <main className="flex flex-col items-center px-4 sm:px-6 md:px-8 pt-24 pb-24 min-h-dvh">
      {/* Decorative Elements */}
      <div className="fixed pointer-events-none inset-0 z-0 overflow-hidden">
        <div className="absolute top-32 left-16 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-32 right-16 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse-slow [animation-delay:2s]"></div>
        <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-chart-1/5 rounded-full blur-2xl animate-pulse-slow [animation-delay:1s]"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 bg-chart-2/5 rounded-full blur-2xl animate-pulse-slow [animation-delay:3s]"></div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto relative z-10">
        {/* <div className="mb-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-chart-1/80 to-primary/60 bg-clip-text text-transparent">
            Developer Spotlight
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Showcasing today's most locked-in developers. See who's coding the most and what languages they're using.
          </p>
        </div> */}
        
        <Leaderboard data={data} totalHeartbeatsReceived={totalHeartbeatsReceived} />
      </div>
    </main>
  );
}
