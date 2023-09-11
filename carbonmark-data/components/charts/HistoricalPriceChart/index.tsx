import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { queryPrices } from "lib/charts/queries";
import { PricesItem } from "lib/charts/types";
import Chart from "./Chart";

/** Async server component that renders a Recharts client component */
export default async function HistoricalPriceChart(props: {
  configuration: SimpleChartConfiguration<PricesItem>;
}) {
  const data = (
    await queryPrices({ sort_by: "date", sort_order: "asc", page_size: -1 })
  ).items;
  return <Chart configuration={props.configuration} data={data} />;
}
