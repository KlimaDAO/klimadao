import { t } from "@lingui/macro";
import DailyCeloCarbonSupplyCard from "components/cards/supply/DailyCeloCarbonSupplyCard";
import DailyEthCarbonSupplyCard from "components/cards/supply/DailyEthCarbonSupplyCard";
import DailyPolygonCarbonSupplyCard from "components/cards/supply/DailyPolygonCarbonSupplyCard";
import DetailPage from "components/pages/DetailPage";
import { ChainDetailPageProps, ChainPageParams } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";
import { getChainLabel } from "lib/chains";

function title(params: ChainPageParams) {
  const chainLabel = getChainLabel(params.chain);
  return t`Digital carbon supply - ${chainLabel}`;
}
function description(params: ChainPageParams) {
  const chainLabel = getChainLabel(params.chain);
  console.log(params);
  return t`The current supply of digital carbon on the ${chainLabel} blockchain broken down by digital carbon pool.`;
}

export async function generateMetadata({ params }: ChainDetailPageProps) {
  return {
    title: title(params),
    description: description(params),
  };
}

export default function DigitalDailyCarbonSupplyPage({
  params,
}: ChainDetailPageProps) {
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
      pageTitle={title(params)}
      card={card}
      overview={description(params)}
      backButtonHref={PageLinks.Supply}
    />
  );
}
