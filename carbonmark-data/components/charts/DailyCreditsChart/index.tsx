import { getDailyCredits } from "lib/charts/aggregators/getDailyCredits";
import { Bridge, DailyCreditsChartQueryParams } from "lib/charts/types";
import { ChartConfiguration } from "../helpers/Configuration";
import Chart from "./Chart";

/** Async server component that renders a Recharts client component */
export default async function DailyCreditsChart(props: {
  queries: Array<DailyCreditsChartQueryParams>;
  configuration: ChartConfiguration<Bridge>;
}) {
  const data = await getDailyCredits(props.queries);
  return <Chart data={data} configuration={props.configuration} />;
}
