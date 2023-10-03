import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { getCarbonMetrics } from "lib/charts/aggregators/getCarbonMetrics";
import { CarbonMetricsItem } from "lib/charts/types";
import { palette } from "theme/palette";
import KAreaChart from "../helpers/KAreaChart";

/** Generic Daily Carbon Supply Chart */
export async function DailyCarbonSupplyChart(props: {
  configuration: SimpleChartConfiguration<CarbonMetricsItem>;
}) {
  const data = await getCarbonMetrics(props.configuration);
  return (
    <KAreaChart
      data={data}
      configuration={props.configuration}
      dateField="date"
    />
  );
}

/** Polygon carbon Supply chart */
export async function DailyPolygonCarbonSupplyChart() {
  const configuration: SimpleChartConfiguration<CarbonMetricsItem> = [
    {
      chartOptions: {
        id: "bct_supply_polygon",
        label: "BCT",
        color: palette.charts.color5,
        legendOrder: 1,
      },
    },
    {
      chartOptions: {
        id: "nct_supply_polygon",
        label: "NCT",
        color: palette.charts.color4,
        legendOrder: 2,
      },
    },
    {
      chartOptions: {
        id: "mco2_supply_polygon",
        label: "MCO2",
        color: palette.charts.color3,
        legendOrder: 3,
      },
    },
    {
      chartOptions: {
        id: "ubo_supply_polygon",
        label: "UBO",
        color: palette.charts.color2,
        legendOrder: 4,
      },
    },
    {
      chartOptions: {
        id: "nbo_supply_polygon",
        label: "NBO",
        color: palette.charts.color1,
        legendOrder: 5,
      },
    },
  ];
  /* @ts-expect-error async Server component */
  return <DailyCarbonSupplyChart configuration={configuration} />;
}

/** Eth carbon Supply chart */
export async function DailyEthCarbonSupplyChart() {
  const configuration: SimpleChartConfiguration<CarbonMetricsItem> = [
    {
      chartOptions: {
        id: "mco2_supply_eth",
        label: "MCO2",
        color: palette.charts.color3,
        legendOrder: 3,
      },
    },
  ];
  /* @ts-expect-error async Server component */
  return <DailyCarbonSupplyChart configuration={configuration} />;
}

/** Celo carbon Supply chart */
export async function DailyCeloCarbonSupplyChart() {
  const configuration: SimpleChartConfiguration<CarbonMetricsItem> = [
    {
      chartOptions: {
        id: "bct_supply_celo",
        label: "BCT",
        color: palette.charts.color5,
        legendOrder: 1,
      },
    },
    {
      chartOptions: {
        id: "nct_supply_celo",
        label: "NCT",
        color: palette.charts.color3,
        legendOrder: 2,
      },
    },
    {
      chartOptions: {
        id: "mco2_supply_celo",
        label: "MCO2",
        color: palette.charts.color1,
        legendOrder: 3,
      },
    },
  ];
  /* @ts-expect-error async Server component */
  return <DailyCarbonSupplyChart configuration={configuration} />;
}
