
import { PaginatedResponse } from "./types";
type GenericChartDataEntry = Record<string, any>
export type GenericChartData = Array<GenericChartDataEntry>;
export type ChartData<T> = Array<T>;

/*
  This function takes multiple datasets and merge them into data usable by recharts
  Params:
   - keys: the attribute name to used in the merged dataset to reference the values of the primitive datasets and passed to the fetch function
   - date_field: The field to use to merge the datasets
   - fetchFunction: The datasets returned by the API
*/
export async function prepareDailyChartData<T>(keys: Array<string>, date_field: string, fetchFunction: (key: string) => Promise<PaginatedResponse<any>>): Promise<ChartData<T>> {
    // Fetch data
    const datasets = await Promise.all(
        keys.map(fetchFunction)
    );

    // Use a dictionnary to merge data and find the smallest and biggest dates
    const records: Record<string, Record<string, any>> = {};
    var minDate: number = 0;
    var maxDate: number = 0;
    for (let i in datasets) {
        const key = keys[i];
        const dataset = datasets[i];
        dataset?.items.forEach(item => {
            const date = Date.parse(item[date_field]);
            records[date] = records[date_field] || {};
            records[date].date = date;
            records[date][key] = item.quantity;
            minDate = minDate || date;
            maxDate = maxDate || date;
            if (date < minDate) minDate = date;
            if (date > maxDate) maxDate = date;
        })
    }
    // Create a new dataset with every dates represented
    const chartData: GenericChartData = [];
    let j: number = 0;
    for (let date = minDate; date <= maxDate; date += 60 * 60 * 24 * 1000) {
        var record = records[date]
        if (j > 0) {
            const previousRecord: Record<string, any> = chartData[j - 1]
            // Use the record computed previously for this date. If the record does not exist use the record from the previous date
            if (record === undefined) {
                record = records[date] || Object.assign({}, previousRecord);
            }
            // If there is no value for a key, use the value from the previous record
            keys.forEach(key => {
                record[key] = record[key] || previousRecord[key];
            })
            // Ensure the date is okay (if we copied the previous record)
            record.date = date
        }
        chartData.push(record);
        j++;
    }
    return chartData as ChartData<T>;
}

export const formatQuantityAsMillions = function (quantity: number) {
    quantity = Math.floor(quantity / 1000000)
    return `${quantity} M`
}
export const formatDateAsMonths = function (date: number) {
    const formatted_date = new Date(date);
    var year = formatted_date.getFullYear();
    var month = String(formatted_date.getMonth()).padStart(2, '0');
    return `${month} / ${year}`
}
// Returns nice ticks to use in a chart
export const niceTicks = function (data: Array<any>, key?: string, numberOfTicks?: number) {
    numberOfTicks = numberOfTicks || 4;
    key = key || "date";
    const ticks = [];
    const intervalSize = (data.length - 1) / (numberOfTicks - 1)
    for (let i = 0; i <= data.length - 1; i += intervalSize) {
        ticks.push(data[Math.floor(i)][key])
    }
    console.log(ticks);
    return ticks

}
export default {
    formatQuantityAsMillions, formatDateAsMonths, prepareDailyChartData, niceTicks
}