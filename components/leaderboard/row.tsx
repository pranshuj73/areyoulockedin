import {
  TableCell,
  TableRow,
} from "@/components/ui/table"
import { MedalIcon, TrophyIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { getDecorations, getMDIIcon } from "@/lib/language"
import type { FileType } from "@/types/lang"
import { Icon } from '@iconify/react';
import { DynamicBadge } from "../ui/dynamic-badge"

interface LeaderboardRowProps {
  position: number
  username: string
  time: number
  languages: FileType[]
  pfp?: string
}

const LanguagePills = ({ languages }: { languages: FileType[] }) => (
  <div className="text-right h-full w-full flex items-center justify-end gap-2">
    {
      languages.map((language, index) => {
        const decorations = getDecorations(language)
        const icon = getMDIIcon(language)
        return (
          <DynamicBadge key={index} text={language}>
            {!decorations?.image && (<Icon icon={`mdi:${icon}`} />)}
            {decorations && decorations.image && <img src={decorations.image} alt={language} className="size-4" />}
          </DynamicBadge>
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
        {position === 1 ? <TrophyIcon className="size-5 mr-2 -ml-7" /> : position === 2 || position === 3 ? <MedalIcon className="size-5 mr-2 -ml-7" /> : null}
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
