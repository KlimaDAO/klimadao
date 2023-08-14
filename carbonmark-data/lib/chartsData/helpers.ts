
import { PaginatedResponse } from "./types";
export type ChartData = Array<Record<string, any>>;

/*
  This function takes multiple datasets and merge them into data usable by recharts
  Params:
   - keys: the attribute name to used in the merged dataset to reference the values of the primitive datasets and passed to the fetch function
   - date_field: The field to use to merge the datasets
   - fetchFunction: The datasets returned by the API
*/
export const prepareDailyChartData: (keys: Array<string>, date_field: string, fetchFunction: (key: string) => Promise<PaginatedResponse<any>>) => Promise<ChartData> = async (keys, date_field, fetchFunction) => {
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
    const chartData: ChartData = [];
    let j: number = 0;
    for (let date = minDate; date <= maxDate; date += 60 * 60 * 24 * 1000) {
        const previousRecord = j > 0 ? chartData[j - 1] : {
            "date": 0,
            "c3": 0,
            "toucan": 0,
            "moss": 0,
        }
        // Use the record computed previously for this date. If the record does not exist use the record from the previous date
        const record = records[date] || Object.assign({}, previousRecord);

        // If there is no value for a key, use the value from the previous record
        keys.forEach(key => {
            record[key] = record[key] || previousRecord[key];
        })
        // Ensure the date is okay (if we copied the previous record)
        record.date = date
        chartData.push(record);
        j++;
    }
    return chartData;
}