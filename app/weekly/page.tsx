import Leaderboard from "@/components/leaderboard";
import { getLeaderboardData } from "@/lib/leaderboard";

const TIMEFRAME: "daily" | "weekly" = "weekly";

export default async function Home() {
  const { data, totalHeartbeatsReceived } = await getLeaderboardData(TIMEFRAME);

  return (
    <Leaderboard
      data={data}
      totalHeartbeatsReceived={totalHeartbeatsReceived}
      timeframe={TIMEFRAME}
    />
  );
}
