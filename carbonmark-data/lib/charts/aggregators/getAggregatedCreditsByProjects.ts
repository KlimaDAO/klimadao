import { TokenDetailsProps } from "components/cards/tokenDetails/helpers";
import {
  CreditsQueryParams,
  DateFieldParam,
  TreeMapData,
} from "lib/charts/types";
import { dateForQuery } from "../helpers";
import { queryAggregatedCreditsByProjects } from "../queries";

/** Transforms widget options into query parameters */
function queryParamsFromProps(props: TokenDetailsProps): CreditsQueryParams {
  const queryParams: CreditsQueryParams = {
    bridge: props.bridge,
    pool: props.pool,
    status: props.status,
  };
  const mapper = {
    bridged: "bridged_date_gt",
    retired: "retirement_date_gt",
    deposited: "deposited_date_gt",
    issued: "issuance_date_gt",
    redeemed: "redeemed_date_gt",
  } as Record<string, DateFieldParam>;
  const dateField: DateFieldParam = mapper[props.status];
  if (props.since == "last7d") {
    queryParams[dateField] = dateForQuery(Date.now() - 60 * 60 * 24 * 7 * 1000);
  } else if (props.since == "last30d") {
    queryParams[dateField] = dateForQuery(
      Date.now() - 60 * 60 * 24 * 30 * 1000
    );
  }
  return queryParams;
}

/* Fetches aggregated credits by projects and format them for a tree chart */
export async function getAggregatedCreditsByProjects(
  props: TokenDetailsProps
): Promise<TreeMapData> {
  const params = queryParamsFromProps(props);

  const finalParams = Object.assign({}, params, {
    sort_by: "quantity",
    sort_order: "desc",
  });
  const data = await queryAggregatedCreditsByProjects(finalParams);
  const chartData: TreeMapData = data.items.map((item) => {
    return {
      name: item.project_type,
      size: item.quantity,
    };
  });
  return chartData;
}
