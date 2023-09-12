import {
  CreditsQueryParams, TreeMapData
} from "lib/charts/types";
import { queryAggregatedCreditsByProjects } from "../queries";

/* Fetches multiple verra credits globally aggregated and merge them to be used in a chart */
export async function getAggregatedCreditsByProjects(params: CreditsQueryParams): Promise<TreeMapData> {
  const finalParams = Object.assign({}, params, {
    sort_by: "quantity",
    sort_order: "desc"
  })
  const data = (await queryAggregatedCreditsByProjects(finalParams));
  const chartData: TreeMapData = data.items.map(item => {
    return {
      name: item.project_type,
      size: item.quantity
    }
  })
  return chartData;
}
