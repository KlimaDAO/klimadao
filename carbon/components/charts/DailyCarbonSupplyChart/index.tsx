import { getCarbonMetrics } from "lib/charts/aggregators/getCarbonMetrics";
import { CarbonMetricsItem } from "lib/charts/types";
import { palette } from "theme/palette";
import { ChartConfiguration } from "../helpers/Configuration";
import KAreaChart from "../helpers/KAreaChart";

/** Generic Daily Carbon Supply Chart */
export async function DailyCarbonSupplyChart(props: {
  configuration: ChartConfiguration<keyof CarbonMetricsItem>;
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
  const configuration: ChartConfiguration<keyof CarbonMetricsItem> = [
    {
      id: "bct_supply_polygon",
      label: "BCT",
      color: palette.charts.color5,
      legendOrder: 1,
    },
    {
      id: "nct_supply_polygon",
      label: "NCT",
      color: palette.charts.color4,
      legendOrder: 2,
    },
    {
      id: "mco2_supply_polygon",
      label: "MCO2",
      color: palette.charts.color3,
      legendOrder: 3,
    },
    {
      id: "ubo_supply_polygon",
      label: "UBO",
      color: palette.charts.color2,
      legendOrder: 4,
    },
    {
      id: "nbo_supply_polygon",
      label: "NBO",
      color: palette.charts.color1,
      legendOrder: 5,
    },
  ];
  /* @ts-expect-error async Server component */
  return <DailyCarbonSupplyChart configuration={configuration} />;
}

/** Eth carbon Supply chart */
export async function DailyEthCarbonSupplyChart() {
  const configuration: ChartConfiguration<keyof CarbonMetricsItem> = [
    {
      id: "mco2_supply_eth",
      label: "MCO2",
      color: palette.charts.color1,
      legendOrder: 5,
    },
  ];
  /* @ts-expect-error async Server component */
  return <DailyCarbonSupplyChart configuration={configuration} />;
}

/** Celo carbon Supply chart */
export async function DailyCeloCarbonSupplyChart() {
  const configuration: ChartConfiguration<keyof CarbonMetricsItem> = [
    {
      id: "mco2_supply_celo",
      label: "MCO2",
      color: palette.charts.color5,
      legendOrder: 1,
    },
    {
      id: "nct_supply_celo",
      label: "NCT",
      color: palette.charts.color3,
      legendOrder: 2,
    },
    {
      id: "bct_supply_celo",
      label: "BCT",
      color: palette.charts.color1,
      legendOrder: 3,
    },
  ];
  /* @ts-expect-error async Server component */
  return <DailyCarbonSupplyChart configuration={configuration} />;
}
