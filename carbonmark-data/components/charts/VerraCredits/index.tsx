import { getVerraCredits } from "lib/charts/getVerraCredits";
import Chart from "./Chart";
async function fetchData() {
  return getVerraCredits();
}

/** Async server component that renders a Recharts client component */
export default async function VerraCreditsChart() {
  const data = await fetchData();
  return <Chart data={data} />;
}
