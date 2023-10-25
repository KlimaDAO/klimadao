import { ChartConfiguration } from "components/charts/helpers/Configuration";
import { CreditsFilteringProps } from "components/charts/helpers/props";
import {
  AggregatedCredits,
  AggregatedCreditsByBridgeAndProjectItem,
  Bridge,
  ChartData,
  CreditsQueryParams,
  DateFieldParam,
  SortQueryParams,
  Status,
  TreeMapData,
  TreeMapItem,
} from "lib/charts/types";
import moment from "moment";
import { statusToDateFieldGt } from "../dateField";
import { dateForQuery } from "../helpers";
import {
  queryAggregatedCredits,
  queryAggregatedCreditsByBridgeAndProject,
} from "../queries";
export type AggregatedCreditsChartDataItem = AggregatedCredits;

export type AggregatedCreditsChartData =
  ChartData<AggregatedCreditsChartDataItem>;

export type AggregatedCreditsChartConfiguration = ChartConfiguration<Bridge>;

export type AggregatedCreditsQueryConfiguration = Array<{
  query: CreditsQueryParams;
}>;

/** Transforms widget options into credits query parameters */
export function creditsQueryParamsFromProps(
  props: CreditsFilteringProps,
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
    queryParams[dateField] = dateForQuery(
      moment().add(-7, "day").startOf("day").unix() * 1000
    );
  } else if (props.since == "last30d") {
    queryParams[dateField] = dateForQuery(
      moment().add(-1, "month").startOf("day").unix() * 1000
    );
  }
  return queryParams;
}
/** Transforms widget options into pools query parameters */
export function poolsQueryParamsFromProps(
  props: CreditsFilteringProps
): CreditsQueryParams {
  const queryParams: CreditsFilteringProps = { ...props };
  if (queryParams.status == "bridged") queryParams.status = "deposited";
  return creditsQueryParamsFromProps(queryParams);
}

/** Queries multiple the aggregated credits endpoint multiple time and merge results into a dataset */
export async function getAggregatedCredits(
  configuration: AggregatedCreditsQueryConfiguration
): Promise<ChartData<AggregatedCreditsChartDataItem>> {
  return await Promise.all(
    configuration.map((configurationItem) => {
      return queryAggregatedCredits(configurationItem.query);
    })
  );
}

/* Fetches aggregated credits by projects and format them for a tree chart */
export async function getAggregatedCreditsByProject(
  props: CreditsFilteringProps
): Promise<TreeMapData<AggregatedCreditsByBridgeAndProjectItem>> {
  const params = creditsQueryParamsFromProps(props);

  const finalParams = Object.assign({}, params, {
    sort_by: "total_quantity",
    sort_order: "desc",
  } as SortQueryParams);
  const data = await queryAggregatedCreditsByBridgeAndProject(finalParams);
  const chartData: TreeMapData<AggregatedCreditsByBridgeAndProjectItem> =
    data.items.map((item) => {
      const newItem = {
        ...item,
      } as TreeMapItem<AggregatedCreditsByBridgeAndProjectItem>;
      newItem.name = item.project_type;
      return newItem;
    });
  return chartData;
}
