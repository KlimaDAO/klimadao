import { SimpleChartConfiguration } from "lib/charts/aggregators";
import {
  DailyCreditsChartConfiguration,
  getDailyCredits,
} from "lib/charts/aggregators/getDailyCredits";
import { DailyCreditsChartDataItem } from "lib/charts/types";
import KAreaChart from "../helpers/KAreaChart";

/** Async server component that renders a Recharts client component */
export default async function DailyCreditsChart(props: {
  configuration: DailyCreditsChartConfiguration;
}) {
  const configuration =
    props.configuration as SimpleChartConfiguration<DailyCreditsChartDataItem>;
  const data = await getDailyCredits(props.configuration);
  return (
    <KAreaChart data={data} configuration={configuration} dateField="date" />
  );
}
