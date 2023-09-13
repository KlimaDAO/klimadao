import { SimpleChartConfigurationFromType } from "lib/charts/aggregators";
import {
  getCeloDailyCarbonMetrics,
  getEthDailyCarbonMetrics,
  getPolygonDailyCarbonMetrics,
} from "lib/charts/aggregators/getCarbonMetrics";
import { palette } from "theme/palette";
import { ChartConfigurationItem } from "../helpers/Configuration";
import Chart, { ChartKey } from "./Chart";

const BCT_CHART_OPTIONS: ChartConfigurationItem<ChartKey> = {
  id: "bct_supply",
  label: "BCT",
  color: palette.charts.color5,
  legendOrder: 1,
};
const NCT_CHART_OPTIONS: ChartConfigurationItem<ChartKey> = {
  id: "nct_supply",
  label: "NCT",
  color: palette.charts.color4,
  legendOrder: 2,
};
const MCO2_CHART_OPTIONS: ChartConfigurationItem<ChartKey> = {
  id: "mco2_supply",
  label: "MCO2",
  color: palette.charts.color3,
  legendOrder: 3,
};
const UBO_CHART_OPTIONS: ChartConfigurationItem<ChartKey> = {
  id: "ubo_supply",
  label: "UBO",
  color: palette.charts.color2,
  legendOrder: 4,
};
const NBO_CHART_OPTIONS: ChartConfigurationItem<ChartKey> = {
  id: "nbo_supply",
  label: "NBO",
  color: palette.charts.color1,
  legendOrder: 5,
};
/** Polygon carbon Supply chart */
export async function DailyPolygonCarbonSupplyChart() {
  const data = await getPolygonDailyCarbonMetrics();
  const configuration: SimpleChartConfigurationFromType<ChartKey> = [
    {
      chartOptions: BCT_CHART_OPTIONS,
    },
    {
      chartOptions: NCT_CHART_OPTIONS,
    },
    {
      chartOptions: MCO2_CHART_OPTIONS,
    },
    { chartOptions: UBO_CHART_OPTIONS },
    {
      chartOptions: NBO_CHART_OPTIONS,
    },
  ];
  return <Chart data={data} configuration={configuration} />;
}

/** Eth carbon Supply chart */
export async function DailyEthCarbonSupplyChart() {
  const data = await getEthDailyCarbonMetrics();
  const configuration: SimpleChartConfigurationFromType<ChartKey> = [
    {
      chartOptions: MCO2_CHART_OPTIONS,
    },
  ];
  return <Chart data={data} configuration={configuration} />;
}

/** Celo carbon Supply chart */
export async function DailyCeloCarbonSupplyChart() {
  const data = await getCeloDailyCarbonMetrics();
  const configuration: SimpleChartConfigurationFromType<ChartKey> = [
    {
      chartOptions: BCT_CHART_OPTIONS,
    },
    {
      chartOptions: NCT_CHART_OPTIONS,
    },
    {
      chartOptions: MCO2_CHART_OPTIONS,
    },
  ];
  return <Chart data={data} configuration={configuration} />;
}
