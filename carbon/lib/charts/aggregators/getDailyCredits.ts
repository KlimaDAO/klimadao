import { ChartConfiguration } from "components/charts/helpers/Configuration";
import { queryAggregatedCreditsByDates } from "lib/charts/queries";
import {
  AggregatedCreditsByDatesItem,
  Bridge,
  ChartDateMappingParams,
  CreditsQueryParams,
  DailyCreditsChartData,
  DailyCreditsChartDataItem,
  DateAggregationFrequency,
} from "lib/charts/types";
import moment from "moment";

export type DailyCreditsQueryConfiguration = Array<{
  query: CreditsQueryParams;
  mapping: ChartDateMappingParams<
    AggregatedCreditsByDatesItem,
    DailyCreditsChartDataItem
  >;
}>;
export type DailyCreditsChartConfiguration = ChartConfiguration<Bridge>;

/* Fetches multiple verra credits aggregated by dates and merge them to be used in a chart */
export async function getMergedCreditsByDate(
  freq: DateAggregationFrequency,
  configuration: DailyCreditsQueryConfiguration
) {
  const granularity = freq == "monthly" ? "M" : "d";
  // Fetch data
  const datasets = await Promise.all(
    configuration.map((configurationItem) =>
      queryAggregatedCreditsByDates(freq, {
        ...configurationItem.query,
        ...{
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
      const id = moment(date).startOf(granularity).toISOString();
      records[id] = records[id] || {};
      const record = records[id];
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

  // Exit quickly if the dataset is empty
  if (Object.keys(records).length == 0) return chartData;

  const emptyRecord: DailyCreditsChartDataItem = {
    date: 0,
    bct_quantity: 0,
    nct_quantity: 0,
    nbo_quantity: 0,
    ubo_quantity: 0,
    mco2_quantity: 0,
    not_pooled_quantity: 0,
    offchain_quantity: 0,
    not_bridge_quantity: 0,
    bridge_quantity: 0,
    toucan_quantity: 0,
    c3_quantity: 0,
    moss_quantity: 0,
    total_quantity: 0,
    bridge_ratio: 0,
  };

  const now = moment();
  let date = moment(minDate);
  while (date.isSameOrBefore(now, granularity)) {
    const id = date.startOf(granularity).toISOString();
    let record: DailyCreditsChartDataItem = records[id];
    if (record === undefined) {
      record = Object.assign({ ...emptyRecord });
    }
    configuration.forEach((configurationItem) => {
      const destination = configurationItem.mapping
        .destination as keyof DailyCreditsChartDataItem;
      record[destination] ||= 0;
    });
    record.date = date.unix() * 1000;
    chartData.push(record as DailyCreditsChartDataItem);
    date = date.add("1", granularity);
  }
  return chartData;
}
