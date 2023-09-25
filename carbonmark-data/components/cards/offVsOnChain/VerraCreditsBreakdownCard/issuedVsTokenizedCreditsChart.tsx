import { t } from "@lingui/macro";
import CustomLegendItem from "components/charts/helpers/CustomLegendItem";
import KHorizontalStackedBarChart from "components/charts/helpers/KHorizontalStackedBarChart";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { formatPercentage, formatTonnes } from "lib/charts/helpers";
import { queryAggregatedCredits } from "lib/charts/queries";
import { ChartData } from "lib/charts/types";
import { palette } from "theme/palette";
import styles from "./styles.module.scss";

interface IssuedvsBridgedItem {
  issued: number;
  bridged: number;
}

export async function IssuedVsTokenizedCreditsChart() {
  const issued = (
    await queryAggregatedCredits({ bridge: "offchain", status: "issued" })
  ).quantity;
  const bridged = (
    await queryAggregatedCredits({ bridge: "all", status: "bridged" })
  ).quantity;
  const percentageTokenized = bridged / issued;
  const data: ChartData<IssuedvsBridgedItem> = [
    {
      issued,
      bridged,
    },
  ];
  const configuration: SimpleChartConfiguration<{
    issued: number;
    bridged: number;
  }> = [
    {
      chartOptions: {
        id: "bridged",
        label: "eza",
        color: palette.charts.color1,
        legendOrder: 1,
      },
    },
    {
      chartOptions: {
        id: "issued",
        label: "eza",
        color: palette.charts.color5,
        legendOrder: 1,
      },
    },
  ];
  return (
    <div className={styles.issuedvsTokenizedWrapper}>
      <div className={styles.fact}>
        <div className={styles.value}>{formatTonnes({ amount: issued })}</div>
        <CustomLegendItem
          color={palette.charts.color5}
          text={t`Verra credits issued`}
        />
      </div>
      <div aria-describedby="chart">
        <KHorizontalStackedBarChart data={data} configuration={configuration} />
      </div>
      <div className={styles.fact}>
        <div className={styles.value}>
          {formatTonnes({ amount: bridged, maximumFractionDigits: 0 })} (
          {formatPercentage({ value: percentageTokenized })})
        </div>
        <CustomLegendItem
          color={palette.charts.color1}
          text={t`Verra credits tokenized`}
        />
      </div>
    </div>
  );
}
