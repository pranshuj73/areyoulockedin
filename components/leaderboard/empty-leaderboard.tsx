import Image from "next/image";
import { Frown, Code2 } from "lucide-react";

export default function EmptyLeaderBoard() {
  return (
    <div className="w-full py-16 flex flex-col items-center gap-10">
      <div className="relative w-full max-w-lg mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-chart-1/10 to-accent/10 blur-3xl opacity-50 animate-pulse"></div>
        
        <div className="relative z-10 rounded-md border border-border/30 bg-background/30 backdrop-blur-sm p-8 text-center">
          <div className="mx-auto w-24 h-24 rounded-full bg-accent/10 flex items-center justify-center mb-6">
            <Frown className="size-12 text-accent-foreground/60" strokeWidth={1.5} />
          </div>
          
          <h3 className="text-xl font-semibold mb-3">No Activity Yet</h3>
          
          <p className="text-muted-foreground mb-8">
            It looks like no one has been coding today. Be the first to get on the leaderboard!
          </p>
          
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <Code2 className="size-5" />
            <span className="animate-pulse">Start coding now</span>
            <Code2 className="size-5" />
          </div>
        </div>
      </div>
      
      <div className="relative group animate-bounce">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 blur-3xl opacity-50 group-hover:opacity-70 transition-all duration-500"></div>
        <Image 
          src="/assets/vegeta.gif" 
          alt="Empty Leaderboard" 
          width={300} 
          height={300} 
          className="relative mx-auto w-[20%] min-w-[200px] h-auto shadow-sm" 
        />
      </div>
    </div>
  )
}
