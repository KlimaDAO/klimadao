import { t } from "@lingui/macro";
import CeloCarbonSupplyCard from "components/cards/supply/CeloCarbonSupplyCard";
import {
  default as EthCarbonSupplyCard,
  default as PolygonCarbonSupplyCard,
} from "components/cards/supply/EthCarbonSupplyCard";
import DetailPage from "components/pages/DetailPage";
import { ChainDetailPageProps } from "components/pages/props";
import { capitalize } from "lodash";

export default function DigitalCarbonSupplyPage({
  params,
}: ChainDetailPageProps) {
  const chainLabel = capitalize(params.chain);
  let card = <></>;
  switch (params.chain) {
    case "polygon":
      card = <PolygonCarbonSupplyCard />;
      break;
    case "eth":
      card = <EthCarbonSupplyCard />;
      break;
    case "celo":
      card = <CeloCarbonSupplyCard />;
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
