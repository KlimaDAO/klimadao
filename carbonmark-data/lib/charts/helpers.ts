import {
  ChartData,
  ChartDateMappingParams,
  ChartMappingParams,
  DailyAggregatedCredits,
  DailyChartData,
  GenericChartDataEntry,
  GenericDailyChartDataEntry,
} from "./types";
/*
  This function takes multiple queries, resolves them to datasets and merge them into data usable by recharts
  Params:
   - keys: the attribute name to used in the merged dataset to reference the values of the primitive datasets and passed to the fetch function
   - date_field: The field to use to merge the datasets
   - fetchFunction: The datasets returned by the API
  Generics:
   - CI: Expected type of items in the chart entry
   - Q: Type of the query and mapping parameters
*/
export async function prepareDailyChartData<
  CI extends GenericDailyChartDataEntry,
  Q extends ChartMappingParams & ChartDateMappingParams,
>(
  queries: Array<Q>,
  fetchFunction: (query: Q) => Promise<DailyAggregatedCredits>
): Promise<DailyChartData<CI>> {
  // Fetch data
  const datasets = await Promise.all(queries.map(fetchFunction));

  // Use a dictionnary to merge data and find the smallest and biggest dates
  const records: Record<string, GenericChartDataEntry> = {};
  let minDate = 0;
  let maxDate = 0;
  for (const i in datasets) {
    const query = queries[i];
    const date_field = query.date_field;
    const dataset = datasets[i];
    dataset?.items.forEach((item) => {
      const date = Date.parse(item[date_field] as string);
      records[date] = records[date_field] || {};
      const record = records[date];
      record.date = date;
      record[query.key] = item.quantity;
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
      const previousRecord: GenericChartDataEntry = chartData[j - 1];
      // Use the record computed previously for this date. If the record does not exist use the record from the previous date
      if (record === undefined) {
        record = records[date] || Object.assign({}, previousRecord);
      }
      // If there is no value for a key, use the value from the previous record
      queries.forEach((query) => {
        record[query.key] = record[query.key] || previousRecord[query.key];
      });
      // Ensure the date is okay (if we copied the previous record)
      record.date = date;
    }
    chartData.push(record as CI);
    j++;
  }
  return chartData;
}

// Common formatters
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
export const formatDateAsMonths = function (date: number): string {
  const formatted_date = new Date(date);
  return formatted_date.toLocaleDateString("de-DE", {
    year: "numeric",
    month: "short",
  });
};
export const formatDateAsDays = function (date: number): string {
  const formatted_date = new Date(date);
  return formatted_date.toLocaleDateString("de-DE", {
    day: "numeric",
    year: "numeric",
    month: "short",
  });
};
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
  formatDateAsMonths,
  formatDateAsDays,
  prepareDailyChartData,
  niceTicks,
  getDataChartMax,
};
export default helpers;
