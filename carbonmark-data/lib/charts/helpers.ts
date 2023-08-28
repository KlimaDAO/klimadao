import { ChartConfiguration } from "components/charts/helpers/Configuration";
import { DateTimeFormatOptions } from "next-intl";
import {
  AggregatedCredits,
  ChartData,
  ChartDateMappingParams,
  ChartMappingParams,
  DailyChartData,
  DailyCredits,
  GenericAggregatedChartDataItem,
  GenericChartDataItem,
  GenericDailyChartDataItem,
} from "./types";
/*
  This function takes multiple queries, resolves them to datasets (daily aggregates) and merge them into data usable by recharts
  Params:
   - configuration: A chart configuration 
   - fetchFunction: The function that queries the API
  Generics:
   - CI: Expected type of items returned in the chart data array   
   - Q: Type of the query params
*/
export async function prepareDailyChartData<
  CI extends GenericDailyChartDataItem,
  Q,
>(
  configuration: ChartConfiguration<Q, ChartDateMappingParams, string | number>,
  fetchFunction: (query: Q) => Promise<DailyCredits>
): Promise<DailyChartData<CI>> {
  // Fetch data
  const datasets = await Promise.all(
    configuration.map((configurationItem) => {
      if (configurationItem.query === undefined)
        throw "Queries are necessary for prepareDailyChartData to fetch data";
      return fetchFunction(configurationItem.query);
    })
  );

  // Use a dictionnary to merge data and find the smallest and biggest dates
  const records: Record<string, GenericChartDataItem> = {};
  let minDate = 0;
  let maxDate = 0;
  for (const i in datasets) {
    const mapping = configuration[i].dataMapping;
    if (mapping == undefined)
      throw "Mappings are necessary for prepareDailyChartData to merge the datasets";
    const dateField = mapping.dateField;
    const dataset = datasets[i];
    dataset?.items.forEach((item) => {
      const date = Date.parse(item[dateField] as string);
      records[date] = records[date] || {};
      const record = records[date];
      record.date = date;
      // TODO: solve data typing properly
      record[mapping.destination] = item[
        mapping.source as keyof typeof item
      ] as string;
      minDate = minDate || date;
      maxDate = maxDate || date;
      if (date < minDate) minDate = date;
      if (date > maxDate) maxDate = date;
    });
  }

  // Create a new dataset with every dates represented
  const chartData: DailyChartData<CI> = [];
  let j = 0;
  for (let date = minDate; date <= maxDate; date += 60 * 60 * 24 * 1000) {
    let record = records[date];
    if (j > 0) {
      const previousRecord: GenericChartDataItem = chartData[j - 1];
      // Use the record computed previously for this date. If the record does not exist use the record from the previous date
      if (record === undefined) {
        record = records[date] || Object.assign({}, previousRecord);
      }
      // If there is no value for a key, use the value from the previous record
      configuration.forEach((configurationItem) => {
        if (configurationItem.dataMapping == undefined)
          throw "Mappings are necessary for prepareDailyChartData to merge the datasets";
        const destination = configurationItem.dataMapping.destination;
        record[destination] =
          record[destination] || previousRecord[destination] || 0;
      });
      // Ensure the date is okay (if we copied the previous record)
      record.date = date;
    }
    chartData.push(record as CI);
    j++;
  }
  return chartData;
}
/*
  This function takes multiple queries, resolves them to datasets (global aggregates) and merge them into data usable by recharts
  Params:
   - fetchFunction: The function that queries the API
  Generics:
   - CI: Expected type of items returned in the chart data array
   - Q: Type of the query and mapping parameters
*/
export async function prepareAggregatedChartData<
  CI extends GenericAggregatedChartDataItem,
  Q,
>(
  configuration: ChartConfiguration<Q, ChartMappingParams, string | number>,
  fetchFunction: (query: Q) => Promise<AggregatedCredits>
): Promise<ChartData<CI>> {
  const datasets = await Promise.all(
    configuration.map((configurationItem) => {
      if (configurationItem.query === undefined)
        throw "Queries are necessary for prepareDailyChartData to fetch data";
      return fetchFunction(configurationItem.query);
    })
  );
  const chartData: ChartData<CI> = [];
  datasets.forEach((dataset, i) => {
    const record: CI = {} as CI;
    const chartOptions = configuration[i].chartOptions;
    record.id = chartOptions.id;
    record.color = chartOptions.color;
    record.label = chartOptions.label || chartOptions.id;
    record.quantity = dataset.quantity;
    chartData.push(record);
  });
  return chartData;
}

// Common formatters
// TODO: This goes to lib?
export const formatQuantityAsMillionsOfTons = function (
  quantity: number
): string {
  quantity = Math.floor(quantity / 1000000);
  return `${quantity} MT`;
};
export const formatQuantityAsKiloTons = function (quantity: number): string {
  quantity = Math.floor(quantity / 1000);
  return `${quantity} KT`;
};
export const formatQuantityAsTons = function (quantity: number): string {
  quantity = Math.floor(quantity);
  return `${quantity} T`;
};
export const formatPrice = function (locale: string) {
  return function (price: number): string {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: "USD",
      maximumSignificantDigits: 2,
    }).format(price);
  };
};
function formatDate(
  locale: string,
  format: DateTimeFormatOptions
): (date: number) => string {
  return function (date: number): string {
    const formatted_date = new Date(date);
    return formatted_date.toLocaleDateString(locale, format);
  };
}

export function formatDateAsMonths(locale: string): (date: number) => string {
  return formatDate(locale, {
    year: "numeric",
    month: "short",
  });
}
export function formatDateAsDays(locale: string): (date: number) => string {
  return formatDate(locale, {
    day: "numeric",
    year: "numeric",
    month: "short",
  });
}

// Returns a list of nice ticks to use in a chart given the data
export function niceTicks<T>(
  data: ChartData<T>,
  key: keyof T,
  numberOfTicks?: number
) {
  numberOfTicks = numberOfTicks || 4;
  const ticks = [];
  const intervalSize = (data.length - 1) / (numberOfTicks - 1);
  for (let i = 0; i <= data.length - 1; i += intervalSize) {
    const value = data[Math.floor(i)][key] as string;
    ticks.push(value);
  }
  return ticks;
}
/* Returns the maximum value from a datachart */
export function getDataChartMax<T>(
  data: ChartData<T>,
  dataKeys: Array<keyof T>
) {
  return data.reduce((accumulator, dataItem) => {
    const values = dataKeys.map(
      (key) => (dataItem[key] ? dataItem[key] : 0) as number
    );
    const localMax = Math.max(...values);
    return Math.max(accumulator, localMax);
  }, 0);
}
const helpers = {
  formatQuantityAsMillionsOfTons,
  formatQuantityAsKiloTons,
  formatQuantityAsTons,
  formatPrice,
  formatDateAsMonths,
  formatDateAsDays,
  prepareDailyChartData,
  niceTicks,
  getDataChartMax,
};
export default helpers;
