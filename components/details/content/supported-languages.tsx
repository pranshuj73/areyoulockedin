import DetailsCard from "@/components/ui/details-card";
import Link from "next/link";

export default function SupportedLanguages() {
  return (
    <DetailsCard title="Supported Languages" description="AYLI currents detects & tracks the following languages.">
      <p>areyoulocked.in currently supports over 750+ languages based on the languages.yml file from <Link href="https://github.com/github-linguist/linguist" target="_blank">github-linguist</Link> (which is the same library GitHub uses to detect & show languages).</p>
      <p>To view the entire list of supported languages &amp; file extensions visit this repository: <Link href="https://github.com/areyoulockedin/langs?tab=readme-ov-file#areyoulockedin---supported-file-types" target="_blank">areyoulockedin/langs</Link>.</p>
    </DetailsCard>
  );
}
