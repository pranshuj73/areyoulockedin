import DetailsCard from "@/components/ui/details-card";
import Link from "@/components/ui/link";

export default function About() {
  return (
    <DetailsCard title="About Us" description="The what, why, how — in brief.">
      <p><strong>areyoulocked.in</strong> is a coding activity tracker with a public leaderboard.</p>
      <p>Via our Neovim and VSCode extensions, AYLI logs the minutes you spend actively writing code.</p>
      <p>Built overnight by <Link href="https://x.com/voltycodes" external>@voltycodes</Link> and <Link href="https://x.com/satyansh_mittal" external>@satyansh_mittal</Link>.</p>
    </DetailsCard>
  );
}
