import { t } from "@lingui/macro";
import { metaDataTitle } from "app/[locale]/layout";
import cardStyles from "components/cards/ChartCard/styles.module.scss";
import VerraCreditsBreakdownCard from "components/cards/offVsOnChain/VerraCreditsBreakdownCard";
import DetailPage from "components/pages/DetailPage";
import { PageLinks } from "lib/PageLinks";

function title() {
  return t`Verra credits breakdown`;
}
function description() {
  return t`The total number of carbon credits that have been issued by carbon registry Verra and what portion have been bridged, tokenized, and retired on-chain.`;
}

export async function generateMetadata() {
  return {
    title: metaDataTitle(title()),
    description: description(),
  };
}

export default function VerraCreditsBreakdownPage() {
  return (
    <DetailPage
      pageTitle={title()}
      card={
        <VerraCreditsBreakdownCard
          isDetailPage={true}
          className={cardStyles.rowCardContainer}
        />
      }
      overview={description()}
      backButtonHref={PageLinks.OffChainVsOnChain}
    />
  );
}
