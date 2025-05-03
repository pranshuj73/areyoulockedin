import DetailsCard from "@/components/ui/details-card";
import Link from "next/link";

export default function About() {
  return (
    <DetailsCard title="About Us" description="The what, why, how — in brief.">
      <p><strong>areyoulocked.in</strong> is a coding activity tracker with a public leaderboard.</p>
      <p>Via our Neovim and VSCode extensions, AYLI logs the minutes you spend actively writing code.</p>
      <p>Built overnight by <Link className="text-blue-700 dark:text-blue-300" href="https://x.com/voltycodes">@voltycodes</Link> and <Link className="text-blue-700 dark:text-blue-300" href="https://x.com/satyansh_mittal">@satyansh_mittal</Link>.</p>
    </DetailsCard>
  );
}
