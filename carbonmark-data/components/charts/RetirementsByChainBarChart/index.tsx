import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { getMonthlyRetirementsByOriginInPercent } from "lib/charts/aggregators/getMonthlyRetirementsByOriginInPercent";
import { KlimaMonthlyRetirementsByOriginItem } from "lib/charts/types";
import Chart from "./Chart";
/** Async server component that renders a Recharts client component */
export default async function RetirementsByChainBarChart(props: {
  configuration: SimpleChartConfiguration<KlimaMonthlyRetirementsByOriginItem>;
}) {
  const data = await getMonthlyRetirementsByOriginInPercent(
    props.configuration
  );
  return <Chart configuration={props.configuration} data={data} />;
}
