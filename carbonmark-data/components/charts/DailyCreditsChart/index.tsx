import {
  DailyCreditsChartConfiguration,
  getDailyCredits,
} from "lib/charts/aggregators/getDailyCredits";
import Chart from "./Chart";

/** Async server component that renders a Recharts client component */
export default async function DailyCreditsChart(props: {
  configuration: DailyCreditsChartConfiguration;
}) {
  const data = await getDailyCredits(props.configuration);
  return <Chart data={data} configuration={props.configuration} />;
}
