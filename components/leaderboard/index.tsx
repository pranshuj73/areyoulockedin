import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LeaderboardRow from "./leaderboard-row"
import EmptyLeaderBoard from "./empty-leaderboard"
import { LeaderboardEntry } from "@/types/leaderboard"

export default function Leaderboard({ data }: { data: LeaderboardEntry[] }) {
  return (
    <section className="text-lg set-mw-center">
      <h1 className="text-xl font-bold mb-6">Today's Leaderboard</h1>
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
