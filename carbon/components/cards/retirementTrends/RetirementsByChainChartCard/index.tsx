import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
import CustomLegendItem from "components/charts/helpers/CustomLegendItem";
import KAreaChart from "components/charts/helpers/KAreaChart";
import { getMonthlyRetirementsByOriginInPercent } from "lib/charts/aggregators/getMonthlyRetirementsByOriginInPercent";
import { KlimaMonthlyRetirementsByOriginItem } from "lib/charts/types";
import { palette } from "theme/palette";
import styles from "./styles.module.scss";

/** Klima DAO Retirements by pool Card */
export default function RetirementsByChainOffchainChartCard(props: CardProps) {
  const chart = (
    <div className={styles.wrapper}>
      <div className={styles.charts}>
        <div>
          {/* @ts-expect-error async Server component */}
          <RetirementsByChainChart view="offchain" />
        </div>
        <div>
          {/* @ts-expect-error async Server component */}
          <RetirementsByChainChart view="onchain" />
        </div>
      </div>
      <div className={styles.legend}>
        <CustomLegendItem color={palette.charts.color5} text={t`Off-chain`} />
        <CustomLegendItem color={palette.charts.color1} text={t`On-chain`} />
      </div>
    </div>
  );

  return (
    <ChartCard
      {...props}
      isColumnCard={true}
      title={t`KlimaDAO retirements by chain`}
      detailUrl="/details/retirement-trends-by-chain"
      chart={chart}
    />
  );
}
/** Async server component that renders a Recharts client component */
async function RetirementsByChainChart(props: {
  view: "onchain" | "offchain";
}) {
  const queryConfiguration: ChartConfiguration<
    keyof KlimaMonthlyRetirementsByOriginItem
  > = [
    {
      id: "amount_retired_offchain",
      label: t`Off-chain`,
      color: palette.charts.color5,
      legendOrder: 1,
    },
    {
      id: "amount_retired_klima",
      label: t`On-chain`,
      color: palette.charts.color1,
      legendOrder: 2,
    },
  ];
  const data = await getMonthlyRetirementsByOriginInPercent(queryConfiguration);
  const configuration = [queryConfiguration[props.view == "offchain" ? 0 : 1]];
  return (
    <KAreaChart
      configuration={configuration}
      data={data}
      YAxis="percentageAutoscale"
      XAxis="months"
      dateField="retirement_date"
      showLegend={false}
    />
  );
}
