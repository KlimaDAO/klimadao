import { t } from "@lingui/macro";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { getCarbonMetrics } from "lib/charts/aggregators/getCarbonMetrics";
import { CarbonMetricsItem } from "lib/charts/types";
import { palette } from "theme/palette";
import Chart from "./Chart";

/** Polygon carbon Retirements chart */
export async function DailyPolygonCarbonRetirementsChart() {
  const configuration: SimpleChartConfiguration<CarbonMetricsItem> = [
    {
      chartOptions: {
        id: "total_klima_retirements_polygon",
        label: t`Retired via KlimaDAO`,
        color: palette.charts.color5,
        legendOrder: 1,
      },
    },
    {
      chartOptions: {
        id: "not_klima_retired_polygon",
        label: t`Retired outside of KlimaDAO`,
        color: palette.charts.color1,
        legendOrder: 2,
      },
    },
  ];
  const data = await getCarbonMetrics(configuration);
  return <Chart data={data} configuration={configuration} />;
}

/** Polygon carbon Supply chart */
export async function DailyEthCarbonRetirementsChart() {
  const configuration: SimpleChartConfiguration<CarbonMetricsItem> = [
    {
      chartOptions: {
        id: "total_retirements_eth",
        label: t`Retired outside of KlimaDAO`,
        color: palette.charts.color5,
        legendOrder: 1,
      },
    },
  ];
  const data = await getCarbonMetrics(configuration);
  return <Chart data={data} configuration={configuration} />;
}
