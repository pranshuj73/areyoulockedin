import DetailsCard from "@/components/ui/details-card";
import Link from "next/link";
import Image from "next/image";

export default function HelpPayForOurServers() {
  return (
    <DetailsCard title="Help pay for our servers!" description="so that we can keep buying coffee and pulling all nighters.">
      <p>We’re broke college kids duct-taping this project together. Your support = more uptime, fewer tears.</p>
      <p>Enjoying the project? Consider dropping us some change (and pleaseeee drop your X username so we can shout you out in the credits).</p>
      <Link className="text-blue-700 dark:text-blue-300" href="https://buymeacoffee.com/mittalsatyansh" target="_blank">Here's our Buy Me A Coffee link.</Link>
      <Image src="/broke.jpg" alt="Beggar Emoji" width={200} height={200} className="mt-4" />
    </DetailsCard>
  )
}
