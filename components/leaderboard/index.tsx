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
      <h1 className="font-semibold text-xl mb-4">Today's Leaderboard</h1>
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
      {/* <p className="text-sm w-full text-center mt-24">areyoulockedin? received 69420 requests today.</p> */}
    </section>
  )
}
