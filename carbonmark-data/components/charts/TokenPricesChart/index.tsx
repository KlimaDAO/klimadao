import { queryPrices } from "lib/charts/queries";
import Chart from "./Chart";

/** Async server component that renders a Recharts client component */
export default async function TokenPricesChart() {
  const data = (
    await queryPrices({ sort_by: "date", sort_order: "desc", page_size: 8 })
  ).items;
  return <Chart pricesNow={data[0]} pricesBefore={data[7]} />;
}
