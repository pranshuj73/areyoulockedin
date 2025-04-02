import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import LeaderboardRow from "./leaderboard-row"

export default function Leaderboard() {
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
        <TableBody>
          <LeaderboardRow
            username="voltycodes"
            position={1}
            time={120}
            languages={["JavaScript", "TypeScript"]}
          />
          <LeaderboardRow
            username="satyansh"
            position={2}
            time={120}
            languages={["JavaScript", "TypeScript", "Rust"]}
          />
          <LeaderboardRow
            username="ranoutofusernames"
            position={3}
            time={120}
            languages={["JavaScript", "TypeScript"]}
          />
          <LeaderboardRow
            username="ranoutofusernames"
            position={4}
            time={120}
            languages={["JavaScript", "TypeScript"]}
          />
          <LeaderboardRow
            username="ranoutofusernames"
            position={5}
            time={120}
            languages={["JavaScript", "TypeScript"]}
          />
        </TableBody>
      </Table>
      <p className="text-sm w-full text-center mt-24">areyoulockedin? received 69420 requests today.</p>
    </section>
  )
}
