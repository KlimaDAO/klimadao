import { formatTonnes as genericFormatTonnes } from "@klimadao/lib/utils/lightIndex";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
import { currentLocale } from "lib/i18n";
import moment from "moment";
import { DateTimeFormatOptions } from "next-intl";
import { ChartData } from "./types";
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
  data.forEach((item, index) => {
    configuration.forEach((conf) => {
      if (index > 0)
        (item[conf.id] as number) += data[index - 1][conf.id] as number;
    });
  });
  return data;
}
// This function fills missing months in query results
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
// Date helpers
export const dateForQuery = function (date: number) {
  return new Date(date).toISOString().split(".")[0];
};

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
