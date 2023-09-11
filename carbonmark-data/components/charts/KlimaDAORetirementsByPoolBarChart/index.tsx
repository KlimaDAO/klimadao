import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { queryKlimaMonthlyRetirementsByPool } from "lib/charts/queries";
import Chart from "./Chart";

/** Async server component that renders a Recharts client component */
export default async function KlimaDAORetirementsByPoolBarChart(props: {
  configuration: SimpleChartConfiguration;
}) {
  const data = (
    await queryKlimaMonthlyRetirementsByPool({
      sort_by: "date",
      sort_order: "asc",
      page_size: -1,
    })
  ).items;
  return <Chart configuration={props.configuration} data={data} />;
}
