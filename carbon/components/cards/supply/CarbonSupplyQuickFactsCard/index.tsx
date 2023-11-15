import { t } from "@lingui/macro";
import PercentageChange from "components/PercentageChange";
import { CoinTileDataFact } from "components/charts/helpers/CoinTiles";
import { PageLinks } from "lib/PageLinks";
import {
  getCarbonMetrics7daysAgo,
  getLatestCarbonMetrics,
} from "lib/charts/aggregators/getCarbonMetrics";
import { formatPercentage, formatTonnes } from "lib/charts/helpers";
import { CarbonMetricsItem, Chain } from "lib/charts/types";
import ChartCard, { CardProps } from "../../ChartCard";
import styles from "./styles.module.scss";

export default function CarbonSupplyQuickFactsCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <CarbonSupplyQuickFactsChart
      isDetailPage={props.isDetailPage}
    ></CarbonSupplyQuickFactsChart>
  );

  return (
    <ChartCard
      {...props}
      title={t`Quick facts`}
      detailUrl={`${PageLinks.Supply}/digital-carbon-supply-quick-facts`}
      chart={chart}
    />
  );
}

/** Async server component that renders a Recharts client component */
async function CarbonSupplyQuickFactsChart(props: { isDetailPage?: boolean }) {
  const metricsNow = await getLatestCarbonMetrics();
  const metrics7DaysAgo = await getCarbonMetrics7daysAgo();

  interface Column {
    title: string;
    suffix: Chain;
  }

  const data: Array<Column> = [
    {
      title: t`Polygon`,
      suffix: "polygon",
    },
    {
      title: t`Ethereum`,
      suffix: "eth",
    },
    {
      title: t`Celo`,
      suffix: "celo",
    },
  ];
  function Fact(props: CoinTileDataFact) {
    return (
      <div className={styles.fact}>
        <div aria-describedby="value">{props.value}</div>
        <div aria-describedby="label">{props.label}</div>
      </div>
    );
  }
  function CarbonSupplyQuickFactsColumn(item: Column) {
    const supplyNow =
      metricsNow[
        `total_carbon_supply_${item.suffix}` as Extract<
          keyof CarbonMetricsItem,
          number
        >
      ];
    const supply7DaysAgo = metrics7DaysAgo[
      `total_carbon_supply_${item.suffix}` as Extract<
        keyof CarbonMetricsItem,
        number
      >
    ] as number;
    const totalRetirements =
      item.suffix == "celo"
        ? 0
        : metricsNow[
            `total_retirements_${item.suffix}` as Extract<
              keyof CarbonMetricsItem,
              number
            >
          ];
    const klimaRetirements =
      item.suffix == "polygon" ? metricsNow.total_klima_retirements_polygon : 0;
    const klimaRetirementsPercentage =
      item.suffix == "polygon" ? klimaRetirements / totalRetirements : 0;
    return (
      <div className={styles.column}>
        <div className={styles.title}>{item.title}</div>
        <Fact
          value={formatTonnes({ amount: supplyNow })}
          label={t`Total supply (tonnes)`}
        />
        <Fact
          value={
            <PercentageChange
              previousValue={supply7DaysAgo}
              currentValue={supplyNow}
              fractionDigits={2}
            ></PercentageChange>
          }
          label={t`Last 7 days`}
        />
        <Fact
          value={formatTonnes({ amount: totalRetirements })}
          label={t`Total retirements (tonnes)`}
        />
        <Fact
          value={formatPercentage({ value: klimaRetirementsPercentage })}
          label={t`Retired via KlimaDAO`}
        />
      </div>
    );
  }
  const wrapperclassName = props.isDetailPage
    ? `${styles.wrapper} ${styles.detailsPageWrapper}`
    : styles.wrapper;

  return (
    <div className={wrapperclassName}>
      {data.map((item) => CarbonSupplyQuickFactsColumn(item))}
    </div>
  );
}
