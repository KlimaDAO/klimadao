import { t } from "@lingui/macro";
import {
  getEthDailyCarbonMetrics,
  getPolygonDailyCarbonMetrics,
} from "lib/charts/aggregators/getCarbonMetrics";
import { palette } from "theme/palette";
import Chart from "./Chart";

/** Polygon carbon Retirements chart */
export async function DailyPolygonCarbonRetirementsChart() {
  const data = await getPolygonDailyCarbonMetrics();
  const configuration = [
    {
      chartOptions: {
        id: "total_klima_retirements",
        label: t`Retired via KlimaDAO`,
        color: palette.charts.color5,
        legendOrder: 1,
      },
    },
    {
      chartOptions: {
        id: "not_klima_retired",
        label: t`Retired outside of KlimaDAO`,
        color: palette.charts.color1,
        legendOrder: 2,
      },
    },
  ];

  return <Chart data={data} configuration={configuration} />;
}

/** Polygon carbon Supply chart */
export async function DailyEthCarbonRetirementsChart() {
  const data = await getEthDailyCarbonMetrics();
  const configuration = [
    {
      chartOptions: {
        id: "total_retirements",
        label: t`Retired outside of KlimaDAO`,
        color: palette.charts.color5,
        legendOrder: 1,
      },
    },
  ];
  return <Chart data={data} configuration={configuration} />;
}
