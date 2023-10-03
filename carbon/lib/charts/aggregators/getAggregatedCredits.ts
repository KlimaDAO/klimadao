import { ChartConfiguration } from "components/charts/helpers/Configuration";
import {
  Bridge,
  ChartData,
  CreditsQueryParams,
  GenericAggregatedChartDataItem,
} from "lib/charts/types";
import { queryAggregatedCredits } from "../queries";

export interface AggregatedCreditsChartDataItem
  extends GenericAggregatedChartDataItem {
  quantity: number;
}

export type AggregatedCreditsChartData =
  ChartData<AggregatedCreditsChartDataItem>;

export type AggregatedCreditsChartConfiguration = ChartConfiguration<Bridge>;

export type AggregatedCreditsQueryConfiguration = Array<{
  query: CreditsQueryParams;
}>;

/*
  This function takes multiple queries, resolves them to datasets (global aggregates) and merge them into data usable by recharts
  Params:
   - fetchFunction: The function that queries the API
  Generics:
   - CI: Expected type of items returned in the chart data array
   - Q: Type of the query and mapping parameters
*/
export async function prepareAggregatedChartData(
  configuration: AggregatedCreditsQueryConfiguration
): Promise<ChartData<AggregatedCreditsChartDataItem>> {
  const datasets = await Promise.all(
    configuration.map((configurationItem) => {
      return queryAggregatedCredits(configurationItem.query);
    })
  );
  const chartData: ChartData<AggregatedCreditsChartDataItem> = [];
  datasets.forEach((dataset, i) => {
    const record: AggregatedCreditsChartDataItem =
      {} as AggregatedCreditsChartDataItem;
    /*
    const chartOptions = configuration[i].chartOptions;
    record.id = chartOptions.id;
    record.color = chartOptions.color;
    record.label = chartOptions.label || chartOptions.id;
    */
    record.quantity = dataset.quantity;
    chartData.push(record);
  });
  return chartData;
}

/* Fetches multiple verra credits globally aggregated and merge them to be used in a chart */
export async function getAggregatedCredits(
  configuration: AggregatedCreditsQueryConfiguration
) {
  return prepareAggregatedChartData(configuration);
}
