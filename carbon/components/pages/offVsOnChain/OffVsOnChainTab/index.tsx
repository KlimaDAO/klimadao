import VerraCreditsOriginCard from "components/cards/offVsOnChain/VerraCreditsOriginCard";

import { Status } from "lib/charts/types";
import layout from "theme/layout.module.scss";

/**
 * A UI layout component to position Off vs On chain page content
 */
export default function OffVsOnChainTab(props: { status: Status }) {
  return (
    <>
      <div className={layout.cardRow}>
        <VerraCreditsOriginCard {...props} className={layout.zIndexTwo} />
      </div>
    </>
  );
}
