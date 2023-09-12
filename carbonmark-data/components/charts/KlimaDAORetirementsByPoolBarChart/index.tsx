import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { getKlimaMonthlyRetirementsByPool } from "lib/charts/aggregators/getKlimaMonthlyRetirementsByPool";
import { KlimaMonthlyRetirementsItem } from "lib/charts/types";
import Chart from "./Chart";

/** Async server component that renders a Recharts client component */
export default async function KlimaDAORetirementsByPoolBarChart(props: {
  configuration: SimpleChartConfiguration<KlimaMonthlyRetirementsItem>;
}) {
  const data = await getKlimaMonthlyRetirementsByPool(props.configuration);
  return <Chart configuration={props.configuration} data={data} />;
}
