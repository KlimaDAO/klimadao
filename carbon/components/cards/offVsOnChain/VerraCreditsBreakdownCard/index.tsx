import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { IssuedVsTokenizedCreditsChart } from "./issuedVsTokenizedCreditsChart";
import {
  OffchainRetiredCreditsCard,
  OnchainRetiredCreditsCard,
} from "./issuedvsRetiredCreditsChart";
import styles from "./styles.module.scss";

/** Verra Credits by bridge and vintage Card */
export default function VerraCreditsBreakdownCard(props: CardProps) {
  let wrapperClassName = props.isDetailPage
    ? `${styles.wrapper} ${styles.wrapperDetailsPage}`
    : styles.wrapper;
  const chart = (
    <div className={wrapperClassName}>
      <div>
        {/* @ts-expect-error async Server component */}
        <IssuedVsTokenizedCreditsChart />
      </div>
      <div>
        {/* @ts-expect-error async Server component */}
        <OffchainRetiredCreditsCard />
        {/* @ts-expect-error async Server component */}
        <OnchainRetiredCreditsCard />
      </div>
    </div>
  );
  const title = t`Verra credits breakdown`;
  const cardClassName = `${props.className} ${styles.card}`;

  return (
    <ChartCard
      {...props}
      title={title}
      detailUrl="/off-chain-vs-on-chain/verra-credits-breakdown"
      chart={chart}
      isColumnCard={true}
      className={cardClassName}
    />
  );
}
