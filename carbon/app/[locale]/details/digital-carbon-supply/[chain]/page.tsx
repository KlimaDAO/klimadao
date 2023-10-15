import { t } from "@lingui/macro";
import DailyCeloCarbonSupplyCard from "components/cards/supply/DailyCeloCarbonSupplyCard";
import DailyEthCarbonSupplyCard from "components/cards/supply/DailyEthCarbonSupplyCard";
import DailyPolygonCarbonSupplyCard from "components/cards/supply/DailyPolygonCarbonSupplyCard";
import DetailPage from "components/pages/DetailPage";
import { ChainDetailPageProps } from "components/pages/props";
import { capitalize } from "lodash";

export default function DigitalDailyCarbonSupplyPage({
  params,
}: ChainDetailPageProps) {
  const chainLabel = capitalize(params.chain);
  let card = <></>;
  switch (params.chain) {
    case "polygon":
      card = <DailyPolygonCarbonSupplyCard isDetailPage={true} />;
      break;
    case "eth":
      card = <DailyEthCarbonSupplyCard isDetailPage={true} />;
      break;
    case "celo":
      card = <DailyCeloCarbonSupplyCard isDetailPage={true} />;
      break;
  }
  return (
    <DetailPage
      pageTitle={t`Digital carbon supply - ${chainLabel}`}
      card={card}
      overview={t`The current supply of digital carbon on the ${chainLabel} blockchain broken down by digital carbon pool.`}
    />
  );
}
