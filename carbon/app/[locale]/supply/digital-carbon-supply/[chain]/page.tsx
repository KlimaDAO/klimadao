import { t } from "@lingui/macro";
import { initLayout, metaDataTitle } from "app/[locale]/layout";
import DailyCeloCarbonSupplyCard from "components/cards/supply/DailyCeloCarbonSupplyCard";
import DailyEthCarbonSupplyCard from "components/cards/supply/DailyEthCarbonSupplyCard";
import DailyPolygonCarbonSupplyCard from "components/cards/supply/DailyPolygonCarbonSupplyCard";
import DetailPage from "components/pages/DetailPage";
import { ChainDetailPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";
import { getChainLabel } from "lib/chains";

function title(props: ChainDetailPageProps) {
  const chainLabel = getChainLabel(props.params.chain);
  return t`Digital carbon supply - ${chainLabel}`;
}
function description(props: ChainDetailPageProps) {
  const chainLabel = getChainLabel(props.params.chain);
  console.log(props.params);
  return t`The current supply of digital carbon on the ${chainLabel} blockchain broken down by digital carbon pool.`;
}

export async function generateMetadata(props: ChainDetailPageProps) {
  return {
    title: metaDataTitle(title(props)),
    description: description(props),
  };
}

export default async function DigitalDailyCarbonSupplyPage(
  props: ChainDetailPageProps
) {
  await initLayout(props.params);
  let card = <></>;
  switch (props.params.chain) {
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
      pageTitle={title(props)}
      card={card}
      overview={description(props)}
      backButtonHref={PageLinks.Supply}
    />
  );
}
