import { t } from "@lingui/macro";
import DailyEthRetirementsCard from "components/cards/supply/DailyEthRetirementsCard";
import DailyPolygonRetirementsCard from "components/cards/supply/DailyPolygonRetirementsCard";
import DetailPage from "components/pages/DetailPage";
import { ChainDetailPageProps, ChainPageParams } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";
import { getChainLabel } from "lib/chains";

function title(params: ChainPageParams) {
  const chainLabel = getChainLabel(params.chain);
  return t`Digital carbon retirements - ${chainLabel}`;
}
function description(params: ChainPageParams) {
  const chainLabel = getChainLabel(params.chain);
  return t`The total number of digital carbon credits retired over time on the ${chainLabel} blockchain.`;
}

export async function generateMetadata({ params }: ChainDetailPageProps) {
  return {
    title: title(params),
    description: description(params),
  };
}

export default function DigitalDailyRetirementsPage({
  params,
}: ChainDetailPageProps) {
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
      pageTitle={title(params)}
      card={card}
      overview={description(params)}
      backButtonHref={PageLinks.Supply}
    />
  );
}
