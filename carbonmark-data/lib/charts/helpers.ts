import {
  ChartData,
  DailyAggregatedCredits,
  DailyChartData,
  DatesAttribute,
  GenericChartDataEntry,
  GenericDailyChartDataEntry,
} from "./types";

/*
  This function takes multiple datasets and merge them into data usable by recharts
  Params:
   - keys: the attribute name to used in the merged dataset to reference the values of the primitive datasets and passed to the fetch function
   - date_field: The field to use to merge the datasets
   - fetchFunction: The datasets returned by the API
  Generics:
   - CI: Expected type of items in the chart entry
   - K: Type of keys usable in the fetchFunction
*/
export async function prepareDailyChartData<
  CI extends GenericDailyChartDataEntry,
  K extends Partial<string>
>(
  keys: Array<K>,
  date_field: DatesAttribute,
  fetchFunction: (key: K) => Promise<DailyAggregatedCredits>
): Promise<DailyChartData<CI>> {
  // Fetch data
  const datasets = await Promise.all(keys.map(fetchFunction));

  // Use a dictionnary to merge data and find the smallest and biggest dates
  const records: Record<string, GenericChartDataEntry> = {};
  let minDate = 0;
  let maxDate = 0;
  for (const i in datasets) {
    const key = keys[i];
    const dataset = datasets[i];
    dataset?.items.forEach((item) => {
      const date = Date.parse(item[date_field] as string);
      records[date] = records[date_field] || {};
      const record = records[date];
      record.date = date;
      record[key] = item.quantity;
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
      keys.forEach((key) => {
        record[key] = record[key] || previousRecord[key];
      });
      // Ensure the date is okay (if we copied the previous record)
      record.date = date;
    }
    chartData.push(record as CI);
    j++;
  }
  return chartData;
}

export const formatQuantityAsMillions = function (quantity: number) {
  quantity = Math.floor(quantity / 1000000);
  return `${quantity} M`;
};
export const formatDateAsMonths = function (date: number) {
  const formatted_date = new Date(date);
  const year = formatted_date.getFullYear();
  const month = String(formatted_date.getMonth()).padStart(2, "0");
  return `${month} / ${year}`;
};
// Returns nice ticks to use in a chart
export function niceTicks<T>(
  data: ChartData<T>,
  key: keyof T,
  numberOfTicks?: number
) {
  numberOfTicks = numberOfTicks || 4;
  const ticks = [];
  const intervalSize = (data.length - 1) / (numberOfTicks - 1);
  for (let i = 0; i <= data.length - 1; i += intervalSize) {
    ticks.push(data[Math.floor(i)][key]);
  }
  return ticks;
}
const helpers = {
  formatQuantityAsMillions,
  formatDateAsMonths,
  prepareDailyChartData,
  niceTicks,
};
export default helpers;
