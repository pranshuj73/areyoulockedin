import DetailsCard from "@/components/ui/details-card";
import Link from "next/link";

const Contributor = ({ name }: { name: string }) => (
  <li>
    <Link className="text-blue-700 dark:text-blue-300" href={`https://x.com/${name}`} target="_blank">
      @{name}
    </Link>
  </li>
)

export default function Credits() {
  return (
    <DetailsCard title="Credits" description="Here's everyone who made this project possible.">
      <p>Devs</p>
      <ul className="list-disc list-inside space-y-1">
        <Contributor name="voltycodes" />
        <Contributor name="satyansh_mittal" />
        <Contributor name="cchar_ptr" />
      </ul>
      <p>Early Testers</p>
      <ul className="list-disc list-inside space-y-1">
        <Contributor name="UI2FLY" />
        <Contributor name="zoriya_dev" />
        <Contributor name="ethanbthoma" />
        <Contributor name="dmztDhruv" />
        <Contributor name="snipeisdead" />
        <Contributor name="0x_syk" />
        <Contributor name="sanatan_dive" />
        <Contributor name="namishh__" />
        <Contributor name="reallyrawn" />
        <Contributor name="damnGruz" />
      </ul>
    </DetailsCard>
  );
}
