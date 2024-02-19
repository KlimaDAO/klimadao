import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
import CustomLegendItem from "components/charts/helpers/CustomLegendItem";
import KAreaChart from "components/charts/helpers/KAreaChart";
import { PageLinks } from "lib/PageLinks";
import { queryMonthlyRetirementsByOrigin } from "lib/charts/queries";
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
      title={t`Retirements by chain`}
      detailUrl={`${PageLinks.RetirementTrends}/retirement-trends-by-chain`}
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
  const data = (
    await queryMonthlyRetirementsByOrigin({
      sort_by: "retirement_date",
      sort_order: "desc",
      page_size: 24,
    })
  ).items;
  data.sort((item1, item2) => {
    return item1.retirement_date > item2.retirement_date ? 1 : -1;
  });
  const configuration = [queryConfiguration[props.view == "offchain" ? 0 : 1]];
  return (
    <KAreaChart
      configuration={configuration}
      data={data}
      YAxis="tons"
      XAxis="months"
      dateField="retirement_date"
      showLegend={false}
    />
  );
}
