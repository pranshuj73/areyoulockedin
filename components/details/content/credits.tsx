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
    <DetailsCard title="Credits" description="Here's to everyone who made this possible.">
      <p>The Builders (aka Devs)</p>
      <ul className="list-disc list-inside space-y-1">
        <Contributor name="voltycodes" />
        <Contributor name="satyansh_mittal" />
        <Contributor name="cchar_ptr" />
      </ul>

      <p>Server Sugar Daddies (thank you for funding our uptime)</p>
      <ul className="list-disc list-inside space-y-1">
        <Contributor name="heyayushh" />
      </ul>

      <p>Brand Ambassadors (shitposting is a full-time job)</p>
      <ul className="list-disc list-inside space-y-1">
        <Contributor name="damnGruz" />
        <Contributor name="shivangitwt" />
      </ul>

      <p>Unpaid QA Interns (early testers, enjoyers of chaos)</p>
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

      <p>Feedback Gang (thank you for making us better)</p>
      <ul className="list-disc list-inside space-y-1">
        <Contributor name="thestonechat" />
        <Contributor name="heyayushh" />
        <Contributor name="ThePikachuDev" />
        <Contributor name="MajorAlter" />
        <Contributor name="aayushchugh_x" />
      </ul>
    </DetailsCard>
  );
}
