import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { MedalIcon, TrophyIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { getDecorations } from "@/lib/language"
import { FileType } from "@/types/lang"

interface LeaderboardRowProps {
  position: number
  username: string
  time: number
  languages: string[]
  pfp?: string
}

const LanguagePills = ({ languages }: { languages: string[] }) => (
  <div className="text-right h-full w-full flex items-center justify-end">
    {
      languages.map((language, index) => {
        const decorations = getDecorations(language as FileType)
        return (
          <span key={index} className="flex items-center justify-center gap-2 bg-gray-200 rounded-full px-2 py-1 text-xs font-medium text-gray-700 mr-2">
            {decorations && decorations.image && <img src={decorations.image} alt={language} className="size-4" />}
            {language}
          </span>
        )
      })
    }
  </div>
)

const User = ({ username, pfp }: { username: string, pfp?: string }) => (
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
      <TableCell className="font-medium text-center flex items-center justify-center py-6">
        {position === 1 ? <TrophyIcon className="size-5 mr-2 -ml-2" /> : position === 2 || position === 3 ? <MedalIcon className="size-5 mr-2 -ml-2" /> : null}
        #{position}
      </TableCell>
      <TableCell className={"font-semibold"}>
        <User username={username} pfp={pfp} />
      </TableCell>
      <TableCell className="text-center">{Math.ceil(time)}m</TableCell>
      <TableCell className="text-right w-full max-w-[60%]">
        <LanguagePills languages={languages} />
      </TableCell>
    </TableRow>
  )
}
