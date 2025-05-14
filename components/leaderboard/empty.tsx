import Image from "next/image";

export default function EmptyLeaderBoard() {
  return (
    <div className="w-full mt-20 flex flex-col items-center gap-6">
      <Image src="/assets/vegeta.gif" alt="Empty Leaderboard" width={300} height={300} className="mx-auto w-[30%] min-w-[300px] h-auto rounded-[12px]" />
      <p className="text-center text-sm">why aren't y'all coding...</p>
    </div>
  )
}
