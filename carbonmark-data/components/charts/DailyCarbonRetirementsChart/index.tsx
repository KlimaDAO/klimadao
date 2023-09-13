import { t } from "@lingui/macro";
import { queryDailyCarbonMetrics } from "lib/charts/queries";
import {
  DailyEthCarbonMetricsItem,
  DailyPolygonCarbonMetricsItem,
} from "lib/charts/types";
import { palette } from "theme/palette";
import Chart from "./Chart";

/** Polygon carbon Retirements chart */
export async function DailyPolygonCarbonRetirementsChart() {
  const data = (
    await queryDailyCarbonMetrics<DailyPolygonCarbonMetricsItem>("polygon", {
      sort_by: "date",
      sort_order: "asc",
      page_size: -1,
    })
  ).items;
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
  const data = (
    await queryDailyCarbonMetrics<DailyEthCarbonMetricsItem>("eth", {
      sort_by: "date",
      sort_order: "asc",
      page_size: -1,
    })
  ).items;
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
