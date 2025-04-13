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
    <section className="text-lg">
      <Table>
        <TableHeader>
          <TableRow>
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
