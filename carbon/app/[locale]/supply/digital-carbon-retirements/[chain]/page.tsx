import { t } from "@lingui/macro";
import { initLayout } from "app/[locale]/layout";
import DailyEthRetirementsCard from "components/cards/supply/DailyEthRetirementsCard";
import DailyPolygonRetirementsCard from "components/cards/supply/DailyPolygonRetirementsCard";
import DetailPage from "components/pages/DetailPage";
import { ChainDetailPageProps } from "components/pages/props";
import { PageLinks } from "lib/PageLinks";
import { getChainLabel } from "lib/chains";

function title(props: ChainDetailPageProps) {
  const chainLabel = getChainLabel(props.params.chain);
  return t`Digital carbon retirements - ${chainLabel}`;
}
function description(props: ChainDetailPageProps) {
  const chainLabel = getChainLabel(props.params.chain);
  return t`The total number of digital carbon credits retired over time on the ${chainLabel} blockchain.`;
}

export async function generateMetadata(props: ChainDetailPageProps) {
  return {
    title: title(props),
    description: description(props),
  };
}

export default async function DigitalDailyRetirementsPage(
  props: ChainDetailPageProps
) {
  await initLayout(props.params);
  let card = <></>;
  switch (props.params.chain) {
    case "polygon":
      card = <DailyPolygonRetirementsCard isDetailPage={true} />;
      break;
    case "eth":
      card = <DailyEthRetirementsCard isDetailPage={true} />;
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
