import { getVerraCredits } from "lib/charts/aggregators/getVerraCredits";
import {
  CreditsChartDataItem,
  CreditsChartQueryParams,
} from "lib/charts/types";
import { ChartConfiguration } from "../helpers/Configuration";
import Chart from "./Chart";
/** Async server component that renders a Recharts client component */

export default async function VerraCreditsChart(props: {
  queries: Array<CreditsChartQueryParams>;
  configuration: ChartConfiguration<CreditsChartDataItem>;
}) {
  const data = await getVerraCredits(props.queries);
  return <Chart data={data} configuration={props.configuration} />;
}
