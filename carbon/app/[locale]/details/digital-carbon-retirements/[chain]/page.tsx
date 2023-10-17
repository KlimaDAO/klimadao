import { t } from "@lingui/macro";
import DailyEthRetirementsCard from "components/cards/supply/DailyEthRetirementsCard";
import DailyPolygonRetirementsCard from "components/cards/supply/DailyPolygonRetirementsCard";
import DetailPage from "components/pages/DetailPage";
import { ChainDetailPageProps } from "components/pages/props";
import { capitalize } from "lodash";

export default function DigitalDailyRetirementsPage({
  params,
}: ChainDetailPageProps) {
  const chainLabel = capitalize(params.chain);
  let card = <></>;
  switch (params.chain) {
    case "polygon":
      card = <DailyPolygonRetirementsCard isDetailPage={true} />;
      break;
    case "eth":
      card = <DailyEthRetirementsCard isDetailPage={true} />;
      break;
  }
  return (
    <DetailPage
      pageTitle={t`Digital carbon retirements - ${chainLabel}`}
      card={card}
      overview={t`The total number of digital carbon credits retired over time on the ${chainLabel} blockchain.`}
    />
  );
}
