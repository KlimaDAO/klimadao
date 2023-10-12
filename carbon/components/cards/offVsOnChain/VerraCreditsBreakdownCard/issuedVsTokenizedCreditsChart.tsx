import { t } from "@lingui/macro";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
import CustomLegendItem from "components/charts/helpers/CustomLegendItem";
import KHorizontalStackedBarChart from "components/charts/helpers/KHorizontalStackedBarChart";
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
  const configuration: ChartConfiguration<"issued" | "bridged"> = [
    {
      id: "bridged",
      label: t`Bridged`,
      color: palette.charts.color1,
      legendOrder: 1,
    },
    {
      id: "issued",
      label: t`Issued`,
      color: palette.charts.color5,
      legendOrder: 1,
    },
  ];
  return (
    <div className={styles.issuedvsTokenizedWrapper}>
      <div className={styles.fact}>
        <div className={styles.value}>{formatTonnes({ amount: issued })}</div>
        <CustomLegendItem
          color={palette.charts.color5}
          text={
            <div className={styles.smallLabel}>{t`Verra credits issued`}</div>
          }
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
          text={
            <div
              className={styles.smallLabel}
            >{t`Verra credits tokenized`}</div>
          }
        />
      </div>
    </div>
  );
}
