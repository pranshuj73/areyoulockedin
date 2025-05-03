import DetailsCard from "@/components/ui/details-card";
import Link from "next/link";
import Image from "next/image";

export default function HelpPayForOurServers() {
  return (
    <DetailsCard title="Help pay for our servers!" description="so that we can keep buying coffee and pulling all nighters.">
      <p>We're a couple of broke college kids building this project and neon.tech isnt so generous with their free plan 😭.</p>
      <p>If you like the project &amp; can spare some change, please help us out lol. <Link className="text-blue-700 dark:text-blue-300" href="https://buymeacoffee.com/mittalsatyansh" target="_blank">Here's our Buy Me A Coffee link.</Link></p>
      <Image src="/broke.jpg" alt="Beggar Emoji" width={200} height={200} className="mt-4" />
    </DetailsCard>
  )
}
