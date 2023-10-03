import { t } from "@lingui/macro";
import { getCarbonMetrics } from "lib/charts/aggregators/getCarbonMetrics";
import { CarbonMetricsItem } from "lib/charts/types";
import { palette } from "theme/palette";
import { ChartConfiguration } from "../helpers/Configuration";
import KAreaChart from "../helpers/KAreaChart";

/** Polygon carbon Retirements chart */
export async function DailyPolygonCarbonRetirementsChart() {
  const configuration: ChartConfiguration<keyof CarbonMetricsItem> = [
    {
      id: "total_klima_retirements_polygon",
      label: t`Retired via KlimaDAO`,
      color: palette.charts.color5,
      legendOrder: 1,
    },
    {
      id: "not_klima_retired_polygon",
      label: t`Retired outside of KlimaDAO`,
      color: palette.charts.color1,
      legendOrder: 2,
    },
  ];
  const data = await getCarbonMetrics(configuration);
  return (
    <KAreaChart data={data} configuration={configuration} dateField="date" />
  );
}

/** Polygon carbon Supply chart */
export async function DailyEthCarbonRetirementsChart() {
  const configuration: ChartConfiguration<keyof CarbonMetricsItem> = [
    {
      id: "total_retirements_eth",
      label: t`Retired outside of KlimaDAO`,
      color: palette.charts.color5,
      legendOrder: 1,
    },
  ];
  const data = await getCarbonMetrics(configuration);
  return (
    <KAreaChart data={data} configuration={configuration} dateField="date" />
  );
}
