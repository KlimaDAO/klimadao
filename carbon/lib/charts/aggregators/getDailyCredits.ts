import { ChartConfiguration } from "components/charts/helpers/Configuration";
import { queryAggregatedCreditsByDates } from "lib/charts/queries";
import {
  AggregatedCreditsByDatesItem,
  Bridge,
  ChartDateMappingParams,
  CreditsQueryParams,
  DailyCreditsChartData,
  DailyCreditsChartDataItem,
} from "lib/charts/types";

export type DailyCreditsQueryConfiguration = Array<{
  query: CreditsQueryParams;
  mapping: ChartDateMappingParams<
    AggregatedCreditsByDatesItem,
    DailyCreditsChartDataItem
  >;
}>;
export type DailyCreditsChartConfiguration = ChartConfiguration<Bridge>;

/*
  This function takes multiple queries, resolves them to datasets (daily aggregates) and merge them into data usable by recharts
  Params:
   - configuration: A chart configuration 
   - fetchFunction: The function that queries the API
  Generics:
   - CI: Expected type of items returned in the chart data array   
   - Q: Type of the query params
*/
export async function prepareDailyChartData(
  configuration: DailyCreditsQueryConfiguration
): Promise<DailyCreditsChartData> {
  // Fetch data
  const datasets = await Promise.all(
    configuration.map((configurationItem) =>
      queryAggregatedCreditsByDates("daily", {
        ...configurationItem.query,
        ...{
          operator: "cumsum",
          page_size: -1,
          sort_order: "asc",
        },
      })
    )
  );

  // Use a dictionnary to merge data and find the smallest and biggest dates
  const records: Record<string, DailyCreditsChartDataItem> = {};
  let minDate = 0;
  let maxDate = 0;
  for (const i in datasets) {
    const mapping = configuration[i].mapping;
    const dateField = mapping.dateField;
    const dataset = datasets[i];
    dataset?.items.forEach((item) => {
      const date = Date.parse(item[dateField] as string);
      records[date] = records[date] || {};
      const record = records[date];
      record.date = date;
      // TODO: solve data typing properly
      record[mapping.destination] = item[mapping.source] as number;
      minDate = minDate || date;
      maxDate = maxDate || date;
      if (date < minDate) minDate = date;
      if (date > maxDate) maxDate = date;
    });
  }

  // Create a new dataset with every dates represented
  const chartData: DailyCreditsChartData = [];
  if (Object.keys(records).length) {
    let j = 0;
    for (let date = minDate; date <= maxDate; date += 60 * 60 * 24 * 1000) {
      let record = records[date];
      if (j > 0) {
        const previousRecord: DailyCreditsChartDataItem = chartData[j - 1];
        // Use the record computed previously for this date. If the record does not exist use the record from the previous date
        if (record === undefined) {
          record = records[date] || Object.assign({}, previousRecord);
        }
        // If there is no value for a key, use the value from the previous record
        configuration.forEach((configurationItem) => {
          const destination = configurationItem.mapping
            .destination as keyof DailyCreditsChartDataItem;
          record[destination] =
            record[destination] || previousRecord[destination] || 0;
        });
        // Ensure the date is okay (if we copied the previous record)
        record.date = date;
      }
      chartData.push(record);
      j++;
    }
  }
  return chartData;
}

/* Fetches multiple verra credits aggregated by dates and merge them to be used in a chart */
export async function getDailyCredits(
  configuration: DailyCreditsQueryConfiguration
) {
  return prepareDailyChartData(configuration);
}
