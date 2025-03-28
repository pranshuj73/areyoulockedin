import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Leaderboard() {
  return (
    <section className="text-lg">
      <h1 className="font-semibold text-xl mb-4">Today's Leaderboard</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Position</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Time Today</TableHead>
            <TableHead className="text-right">Languages</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium text-center">#1</TableCell>
            <TableCell>@voltycodes</TableCell>
            <TableCell>420m</TableCell>
            <TableCell className="text-right">TS, JS, Some More Web Slop Stuff</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <p className="w-full text-center mt-24">areyoulockedin? received 69420 requests today.</p>
    </section>
  )
}
