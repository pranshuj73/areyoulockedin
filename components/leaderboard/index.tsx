import { LeaderboardEntry } from "@/types/leaderboard"
import { TrophyIcon, MedalIcon } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { getDecorations } from "@/lib/language"
import { FileType } from "@/types/lang"
import EmptyLeaderBoard from "./empty-leaderboard"

const PositionBadge = ({ position }: { position: number }) => {
  if (position === 1) {
    return (
      <div className="absolute -top-3 -right-3 size-14 bg-yellow-500/10 rounded-full flex items-center justify-center">
        <div className="relative">
          <TrophyIcon className="size-7 text-yellow-500" strokeWidth={1.5} />
          <span className="absolute inset-0 text-yellow-500 animate-ping opacity-30">
            <TrophyIcon className="size-7" strokeWidth={1.5} />
          </span>
        </div>
      </div>
    )
  } else if (position === 2) {
    return (
      <div className="absolute -top-3 -right-3 size-14 bg-gray-300/10 rounded-full flex items-center justify-center">
        <MedalIcon className="size-7 text-gray-400" strokeWidth={1.5} />
      </div>
    )
  } else if (position === 3) {
    return (
      <div className="absolute -top-3 -right-3 size-14 bg-amber-700/10 rounded-full flex items-center justify-center">
        <MedalIcon className="size-7 text-amber-700" strokeWidth={1.5} />
      </div>
    )
  }
  
  return (
    <div className="absolute -top-2 -right-2 size-9 bg-accent/10 rounded-full flex items-center justify-center">
      <span className="text-accent-foreground font-semibold text-sm">#{position}</span>
    </div>
  )
}

const UserCard = ({ entry, position }: { entry: LeaderboardEntry, position: number }) => {
  const { username, profilePictureUrl: pfp, totalTimeSpent, languages } = entry
  
  // Calculate the percentage for the progress ring (max is arbitrarily set to 480 minutes - 8 hours)
  const MAX_TIME = 480 // 8 hours as reference max
  const timePercentage = Math.min(100, (totalTimeSpent / MAX_TIME) * 100)
  const circumference = 2 * Math.PI * 40 // 40 is the radius of the circle
  const strokeDashoffset = circumference - (timePercentage / 100) * circumference
  
  return (
    <div className="relative group">
      <div className="absolute inset-0 bg-accent/5 blur-md opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
      
      <div className="relative z-10 p-6 rounded-md border border-border/30 bg-background/30 backdrop-blur-sm hover:border-border/50 transition-all duration-300 h-full flex flex-col">
        <PositionBadge position={position} />
        
        <div className="flex flex-col items-center mb-4">
          <Avatar className="size-20 border border-border/30 mb-3 shadow-sm">
            <AvatarImage src={pfp} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl font-semibold">{username.at(0)?.toUpperCase()}</AvatarFallback>
          </Avatar>
          
          <Link 
            href={`https://x.com/${username}`}
            target="_blank"
            className="text-foreground font-medium hover:text-primary transition-colors duration-200"
          >
            @{username}
          </Link>
        </div>
        
        <div className="relative flex justify-center items-center mb-5">
          <svg className="transform -rotate-90 size-24" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              className="text-accent/10"
              strokeWidth="8"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              className="text-primary"
              strokeWidth="8"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center flex-col">
            <span className="text-xl font-bold">{Math.ceil(totalTimeSpent)}</span>
            <span className="text-xs text-muted-foreground">minutes</span>
          </div>
        </div>
        
        <div className="mt-auto">
          <p className="text-xs text-muted-foreground mb-2 font-medium">Languages:</p>
          <div className="flex flex-wrap gap-1.5">
            {languages.map((language, index) => {
              const decorations = getDecorations(language as FileType)
              return (
                <span 
                  key={index} 
                  className="inline-flex items-center gap-1 bg-accent/20 hover:bg-accent/40 rounded-sm px-1.5 py-0.5 text-xs font-medium text-accent-foreground transition-all duration-200"
                >
                  {decorations && decorations.image && (
                    <img src={decorations.image} alt={language} className="size-3" />
                  )}
                  {language}
                </span>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Leaderboard({ data, totalHeartbeatsReceived }: { data: LeaderboardEntry[], totalHeartbeatsReceived: number }) {
  return (
    <section className="w-full">
      {data.length === 0 && <EmptyLeaderBoard />}
      
      {data.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.map((entry, index) => (
              <UserCard key={entry.userId} entry={entry} position={index + 1} />
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground/80">{totalHeartbeatsReceived.toLocaleString()}</span> heartbeats received today
            </p>
          </div>
        </>
      )}
    </section>
  )
}
