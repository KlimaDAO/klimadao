"use client"
import Skeleton from "components/Skeleton";
import {
  ConfigurationKey,
  fetchData,
} from "components/charts/helpers/DataTable/configurations";
import { PaginatedResponse, SortQueryParams } from "lib/charts/types";
import { useEffect, useState } from "react";
import TableHeaderClientWrapper from "../TableHeaderClientWrapper";

/** A Client Component (wannabe Server Component) that renders the actual Table
 * configurationKey: Table configuration key
 * page: the page of the dataset to render
 * height: expected height of the table (for skeleton)
 */
export default function PaginatedTable<RI>(props: {
  configurationKey: ConfigurationKey;
  page: number;
  params: object;
  skeletonClassName?: string;
  sortParams: SortQueryParams;
  setSortParams: (sortParams: SortQueryParams) => void;
}) {
  const [data, setData] = useState<PaginatedResponse<RI> | null>(null);

  useEffect(() => {
    setData(null);
    fetchData(props.configurationKey, props.page, props.params, props.sortParams).then((data) => {
      /* FIXME: Unfortunately we have to hardcast this */
      setData(data as PaginatedResponse<RI>);
    });
  }, [props.page, props.sortParams]);

  return data ? (
    <TableHeaderClientWrapper
      configurationKey={props.configurationKey}
      params={props.params}
      data={data}
      sortParams={props.sortParams} setSortParams={props.setSortParams}
    />
  ) : (
    <Skeleton className={props.skeletonClassName} />
  );
}
