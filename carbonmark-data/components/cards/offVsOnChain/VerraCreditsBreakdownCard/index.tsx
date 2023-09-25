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
  const chart = (
    <div className={styles.wrapper}>
      {/* @ts-expect-error async Server component */}
      <IssuedVsTokenizedCreditsChart />
      {/* @ts-expect-error async Server component */}
      <OffchainRetiredCreditsCard />
      {/* @ts-expect-error async Server component */}
      <OnchainRetiredCreditsCard />
    </div>
  );
  const title = t`Verra credits breakdown`;

  return (
    <ChartCard
      {...props}
      title={title}
      detailUrl="/details/digital-carbon-supply-snapshot"
      chart={chart}
    />
  );
}
