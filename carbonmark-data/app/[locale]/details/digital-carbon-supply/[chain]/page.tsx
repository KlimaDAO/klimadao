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
      card = <DailyPolygonCarbonSupplyCard />;
      break;
    case "eth":
      card = <DailyEthCarbonSupplyCard />;
      break;
    case "celo":
      card = <DailyCeloCarbonSupplyCard />;
      break;
  }
  return (
    <DetailPage
      pageTitle={t`Digital Carbon Supply - ${chainLabel}`}
      card={card}
      overview={t`Lorem Ipsum`}
    />
  );
}
