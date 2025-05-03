import DetailsCard from "@/components/ui/details-card";

export default function HowItWorks() {
  return (
    <DetailsCard title="How It Works" description="5 steps to getting tracked.">
      <ol className="list-decimal list-inside space-y-1">
        <li>Sign up on <strong>areyoulocked.in</strong></li>
        <li>Install the Neovim or VSCode extension</li>
        <li>Grab your session key from your profile</li>
        <li>Paste it into the extension (follow setup instructions on their pages)</li>
        <li>You're all set. Start coding.</li>
      </ol>
      <p>Tracking starts automatically when you're editing files.</p>
    </DetailsCard>
  );
}
