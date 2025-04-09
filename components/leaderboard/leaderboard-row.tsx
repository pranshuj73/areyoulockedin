import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { MedalIcon, TrophyIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

interface LeaderboardRowProps {
  position: number
  username: string
  time: number
  languages: string[]
  pfp?: string
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

const User = ({username, pfp}: {username: string, pfp?: string}) => (
  <Link className="flex items-center gap-2 hover:bg-foreground/10 w-min pl-1 pr-3 py-1 -my-1 rounded-full transition-all duration-300 ease-out" href={`https://x.com/${username}`} target="_blank">
    <Avatar>
      <AvatarImage src={pfp} />
      <AvatarFallback>{username.at(0)}</AvatarFallback>
    </Avatar>
    <span>@{username}</span>
  </Link>
)

export default function LeaderboardRow({ position, username, time, languages, pfp }: LeaderboardRowProps) {
  return (
    <TableRow>
      <TableCell className="font-medium text-center flex items-center justify-center gap-2 py-6">
        {position === 1 ? <TrophyIcon className="size-5 -ml-7" /> : position === 2 || position === 3 ? <MedalIcon className="size-5 -ml-7" /> : null}
        #{position}
      </TableCell>
      <TableCell className={"font-semibold"}>
        <User username={username} pfp={pfp} />
      </TableCell>
      <TableCell className="text-center">{Math.ceil(time)}m</TableCell>
      <LanguagePills languages={languages} />
    </TableRow>
  )
}
