import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { MedalIcon, TrophyIcon } from "lucide-react"

interface LeaderboardRowProps {
  position: number
  username: string
  time: number
  languages: string[]
}

const LanguagePills = ({ languages }: { languages: string[] }) => (
  <TableCell className="text-right">{
    languages.map((language, index) => (
      <span key={index} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-medium text-gray-700 mr-2">
        {language}
      </span>
    ))
  }
  </TableCell>
)

export default function LeaderboardRow({ position, username, time, languages }: LeaderboardRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium text-center flex items-center justify-center gap-2">
        {position === 1 ? <TrophyIcon className="size-5 -ml-7" /> : position === 2 || position === 3 ? <MedalIcon className="size-5 -ml-7" /> : null}
        #{position}
      </TableCell>
      <TableCell className={"font-semibold" + (position === 1 ? " text-base" : "")}>@{username}</TableCell>
      <TableCell className="text-center">{time}m</TableCell>
      <LanguagePills languages={languages} />
    </TableRow>
  )
}
