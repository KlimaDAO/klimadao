import { TokenDetailsProps } from "components/cards/tokenDetails/helpers";
import {
  CreditsQueryParams,
  DateFieldParam,
  Status,
  TreeMapData,
} from "lib/charts/types";
import { statusToDateFieldGt } from "../dateField";
import { dateForQuery } from "../helpers";
import { queryAggregatedCreditsByProjects } from "../queries";

/** Transforms widget options into credits query parameters */
export function creditsQueryParamsFromProps(
  props: TokenDetailsProps,
  forceStatus?: Status
): CreditsQueryParams {
  const status = forceStatus === undefined ? props.status : forceStatus;
  const queryParams: CreditsQueryParams = {
    bridge: props.bridge,
    pool: props.pool,
    status,
  };

  const dateField: DateFieldParam = statusToDateFieldGt(status);
  if (props.since == "last7d") {
    queryParams[dateField] = dateForQuery(Date.now() - 60 * 60 * 24 * 7 * 1000);
  } else if (props.since == "last30d") {
    queryParams[dateField] = dateForQuery(
      Date.now() - 60 * 60 * 24 * 30 * 1000
    );
  }
  return queryParams;
}
/** Transforms widget options into pools query parameters */
export function poolsQueryParamsFromProps(
  props: TokenDetailsProps
): CreditsQueryParams {
  const queryParams: TokenDetailsProps = { ...props };
  if (queryParams.status == "bridged") queryParams.status = "deposited";
  return creditsQueryParamsFromProps(queryParams);
}

/* Fetches aggregated credits by projects and format them for a tree chart */
export async function getAggregatedCreditsByProjects(
  props: TokenDetailsProps
): Promise<TreeMapData> {
  const params = creditsQueryParamsFromProps(props);

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
