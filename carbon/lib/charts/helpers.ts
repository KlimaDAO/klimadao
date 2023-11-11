import { formatTonnes as genericFormatTonnes } from "@klimadao/lib/utils";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
import { currentLocale } from "lib/i18n";
import moment from "moment";
import { DateTimeFormatOptions } from "next-intl";
import { queryAggregatedPoolVolumesByDates } from "./queries";
import {
  ChartData,
  DailyCreditsChartData,
  DailyCreditsChartDataItem,
  DailyCreditsQueryConfiguration,
  DateAggregationFrequency,
} from "./types";
/*
  This function takes ChartData and transform values into percentages given a chart configuration
  Params:
   - fetchFunction: The function that queries the API
  Generics:
   - CI: Expected type of items returned in the chart data array
   - Q: Type of the query and mapping parameters
*/
export function transformToPercentages<CI>(
  data: ChartData<CI>,
  configuration: ChartConfiguration<keyof CI>
): ChartData<CI> {
  data.forEach((item) => {
    const total = configuration.reduce((prev, conf) => {
      return prev + (item[conf.id] as number);
    }, 0);
    configuration.forEach((conf) => {
      (item[conf.id] as number) = (item[conf.id] as number) / total;
    });
  });
  return data;
}
export function fillWithZeroes<CI extends object>(
  data: ChartData<CI>,
  configuration: ChartConfiguration<keyof CI>,
  dateField: keyof CI,
  granularity: moment.unitOfTime.DurationConstructor
): ChartData<CI> {
  if (data.length == 0) return data;
  let date = moment(data[0][dateField] as string);
  const now = moment();
  const newData: ChartData<CI> = [];
  while (date.isSameOrBefore(now, granularity)) {
    let newItem: CI | undefined = data.find((item) => {
      const itemDate = moment(item[dateField] as string).startOf(granularity);
      return itemDate.isSame(date, granularity);
    });
    if (newItem === undefined) {
      newItem = Object.assign({ ...data[0] });
      configuration.forEach((conf) => {
        (newItem![conf.id] as number) = 0;
      });
    }
    if (newItem) {
      (newItem[dateField] as string) = date.startOf(granularity).toISOString();
      newData.push(newItem);
    }
    date = date.add("1", granularity);
  }
  return newData;
}
export function cumulativeSum<CI extends object>(
  data: ChartData<CI>,
  configuration: ChartConfiguration<keyof CI>
): ChartData<CI> {
  const newData = data.map((item) => {
    return { ...item };
  });
  newData.forEach((item, index) => {
    configuration.forEach((conf) => {
      if (index > 0) {
        const previousValue = newData[index - 1][conf.id];
        if (previousValue) (item[conf.id] as number) += previousValue as number;
      }
    });
  });
  return newData;
}

/** 
  Returns chart data where there are no rows with all charted data equals 0
*/
export function pruneNullRows<CI>(
  data: ChartData<CI>,
  configuration: ChartConfiguration<keyof CI>
): ChartData<CI> {
  return data.filter((item) => {
    return configuration.some((conf) => {
      const value = item[conf.id];
      return Number(value) != 0;
    });
  });
}
/**
 * Queries multiple times a credits and pool endpoints and merge the results
 */
export async function getMergedVolumes(
  freq: DateAggregationFrequency,
  configuration: DailyCreditsQueryConfiguration,
  queryFunction: typeof queryAggregatedPoolVolumesByDates
) {
  const granularity = freq == "monthly" ? "M" : "d";
  // Fetch data
  const datasets = await Promise.all(
    configuration.map((configurationItem) =>
      queryFunction(freq, {
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

// Date helpers
export function dateForQuery(date: number): string {
  return new Date(date).toISOString().split(".")[0];
}

// Common formatters
export function formatQuantityAsMillionsOfTons(quantity: number): string {
  quantity = Math.floor(quantity / 1000000);
  return `${quantity} MT`;
}
export function formatQuantityAsKiloTons(quantity: number): string {
  quantity = Math.floor(quantity / 1000);
  return `${quantity} KT`;
}
export function formatQuantityAsTons(quantity: number): string {
  quantity = Math.floor(quantity);
  return `${quantity} T`;
}
export function getTonsFormatter(quantity: number) {
  return quantity < 10 ** 4
    ? formatQuantityAsTons
    : quantity < 10 ** 7
    ? formatQuantityAsKiloTons
    : formatQuantityAsMillionsOfTons;
}
export const formatPrice = function (price: number): string {
  // Enforce prices formatting in english locale ($0.00)
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 2,
  }).format(price);
};

function formatDate(format: DateTimeFormatOptions): (date: number) => string {
  return function (date: number): string {
    const formatted_date = new Date(date);
    return formatted_date.toLocaleDateString(currentLocale(), format);
  };
}
function formatTime(): (date: number) => string {
  return function (date: number): string {
    const formatted_date = new Date(date);
    return formatted_date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
}

export function formatDateAsMonths(date: number) {
  return formatDate({
    year: "numeric",
    month: "short",
  })(date);
}
export function formatDateAsMonthsShort(date: number) {
  return formatDate({
    year: "2-digit",
    month: "short",
  })(date);
}
export function formatDateAsDays(date: number) {
  return formatDate({
    day: "numeric",
    year: "numeric",
    month: "short",
  })(date);
}
export function formatDateAsDaysShort(date: number) {
  return formatDate({
    day: "numeric",
    year: "numeric",
    month: "numeric",
  })(date);
}
export function formatDateAndTime(date: number) {
  return function (date: number): string {
    const day = formatDateAsDays(date);
    const time = formatTime()(date);
    return `${day} ${time}`;
  };
}

export function formatPercentage(params: {
  value: number;
  fractionDigits?: number;
}): string {
  const fractionDigits =
    params.fractionDigits !== undefined ? params.fractionDigits : 2;
  return `${(params.value * 100).toFixed(fractionDigits)}%`;
}

/** A wrapper around lib's genericFormatTonnes that uses the current locale */
export function formatTonnes(params: {
  amount: number;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}): string {
  const locale = currentLocale();
  return genericFormatTonnes({
    amount: String(params.amount),
    locale,
    minimumFractionDigits: params.minimumFractionDigits,
    maximumFractionDigits: params.maximumFractionDigits,
  });
}

// Returns a list of nice ticks to use in a chart given the data
export function niceTicks<T>(
  data: ChartData<T>,
  key: keyof T,
  numberOfTicks?: number
) {
  const ticks = [];
  if (data.length > 0) {
    numberOfTicks = numberOfTicks || 4;
    const intervalSize = Math.max(1, (data.length - 1) / (numberOfTicks - 1));
    for (let i = 0; i <= data.length - 1; i += intervalSize) {
      const value = data[Math.floor(i)][key] as string;
      ticks.push(value);
    }
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
  fillWithZeroes,
  cumulativeSum,
  formatDateAndTime,
  formatQuantityAsMillionsOfTons,
  formatQuantityAsKiloTons,
  formatQuantityAsTons,
  formatPrice,
  formatPercentage,
  formatTonnes,
  formatDateAsMonths,
  formatDateAsMonthsShort,
  formatDateAsDays,
  formatDateAsDaysShort,
  niceTicks,
  getDataChartMax,
};
export default helpers;
