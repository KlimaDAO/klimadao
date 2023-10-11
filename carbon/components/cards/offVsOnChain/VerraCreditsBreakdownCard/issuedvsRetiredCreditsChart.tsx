import { t } from "@lingui/macro";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
import KPieChart from "components/charts/helpers/KPieChart";
import { formatPercentage, formatTonnes } from "lib/charts/helpers";
import { queryAggregatedCredits } from "lib/charts/queries";
import { palette } from "theme/palette";
import styles from "./styles.module.scss";

export async function OffchainRetiredCreditsCard() {
  const issued = (
    await queryAggregatedCredits({ bridge: "offchain", status: "issued" })
  ).quantity;
  const retired = (
    await queryAggregatedCredits({ bridge: "offchain", status: "retired" })
  ).quantity;
  const legend = (
    <span className={styles.smallLabel}>
      {" "}
      {t`Verra credits retired`}{" "}
      <span className={styles.highlight}>{t`off-chain`}</span>
    </span>
  );
  return (
    <RetiredCreditsChart issued={issued} retired={retired} legend={legend} />
  );
}

export async function OnchainRetiredCreditsCard() {
  const issued = (
    await queryAggregatedCredits({ bridge: "all", status: "bridged" })
  ).quantity;
  const retired = (
    await queryAggregatedCredits({ bridge: "all", status: "retired" })
  ).quantity;
  const legend = (
    <span className={styles.smallLabel}>
      {" "}
      {t`Verra credits retired`}{" "}
      <span className={styles.highlight}>{t`on-chain`}</span>
    </span>
  );
  return (
    <RetiredCreditsChart issued={issued} retired={retired} legend={legend} />
  );
}

function RetiredCreditsChart(props: {
  issued: number;
  retired: number;
  legend: React.ReactNode;
}) {
  const configuration: ChartConfiguration<"issued" | "retired"> = [
    {
      id: "issued",
      label: t`Issued`,
      color: palette.charts.color1,
      legendOrder: 1,
    },
    {
      id: "retired",
      label: t`Retired`,
      color: palette.charts.color3,
      legendOrder: 2,
    },
  ];
  const data = [
    {
      quantity: props.issued,
      id: "issued",
    },
    {
      quantity: props.retired,
      id: "retired",
    },
  ];
  return (
    <div className={styles.issuedvsRetiredWrapper}>
      <div className={styles.pieChartWrapper}>
        <KPieChart
          data={data}
          configuration={configuration}
          showTooltip={false}
          legendContent={
            <RetiredCreditsLegendContent
              retired={props.retired}
              issued={props.issued}
            />
          }
        />
      </div>
      <div className={styles.fact}>
        <div className={styles.value}>
          {formatTonnes({ amount: props.retired, maximumFractionDigits: 0 })}
        </div>
        {props.legend}
      </div>
    </div>
  );
}

function RetiredCreditsLegendContent(props: {
  issued: number;
  retired: number;
}) {
  const percentage = props.retired / props.issued;
  return (
    <div className={styles.pieChartInnerLegend}>
      <div aria-describedby="value">
        {formatPercentage({ value: percentage })}
      </div>
      <div className={styles.smallLabel}>{t`of retired credits`}</div>
    </div>
  );
}
