import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LeaderboardRow from "@/components/leaderboard/row"
import EmptyLeaderBoard from "@/components/leaderboard/empty"
import { LeaderboardEntry } from "@/types/leaderboard"
import Link from "next/link"

export default function LeaderboardTable({ data, timeframe }: { data: LeaderboardEntry[], timeframe: "daily" | "weekly" }) {
  return (
    <section className="text-lg set-mw-center snap-y">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl capitalize font-bold">{timeframe === "daily" ? "Today's" : "Weekly"} Leaderboard</h1>

        <div className="text-sm flex flex-nowrap border-2 py-1 rounded-sm overflow-hidden relative">
          <div className={`absolute min-w-20 lg:min-w-22 h-full rounded-full bg-border top-0 ${timeframe === "daily" ? "left-0" : "right-0"} z-0`} />
          <Link className="min-w-20 lg:min-w-22 text-center z-10" href="/">Daily</Link>
          <Link className="min-w-20 lg:min-w-22 text-center z-10" href="/weekly">Weekly</Link>
        </div>

      </div>
      <Table className="rounded-sm outline outline-border overflow-hidden">
        <TableHeader className="bg-foreground/10 py-4">
          <TableRow className="[&>*]:p-4">
            <TableHead className="w-[100px]">Position</TableHead>
            <TableHead>User</TableHead>
            <TableHead className="text-center">Time Today</TableHead>
            <TableHead className="text-right">Languages</TableHead>
          </TableRow>
        </TableHeader>

        {data.length !== 0 && (
          <TableBody>
            {data.map((entry, index) => (
              <LeaderboardRow
                key={entry.userId}
                username={entry.username}
                pfp={entry.profilePictureUrl}
                position={index + 1}
                time={entry.totalTimeSpent}
                languages={entry.languages}
              />
            ))}
          </TableBody>
        )}

      </Table>
      {data.length === 0 && <EmptyLeaderBoard />}

    </section>
  )
}
