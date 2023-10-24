import {
  ConfigurationKey,
  fetchData,
} from "components/charts/helpers/DataTable/configurations";
import Table from "components/charts/helpers/DataTable/Table";
import Skeleton from "components/Skeleton";
import { PaginatedResponse, SortQueryParams } from "lib/charts/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

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
  sortParams: SortQueryParams
  setSortParams: Dispatch<SetStateAction<SortQueryParams>>
}) {
  const [data, setData] = useState<PaginatedResponse<RI> | null>(null);
  useEffect(() => {
    setData(null);
    fetchData(props.configurationKey, props.page, props.params).then((data) => {
      /* FIXME: Unfortunately we have to hardcast this */
      setData(data as PaginatedResponse<RI>);
    });
  }, [props.page]);

  return data ? (
    <Table
      configurationKey={props.configurationKey}
      params={props.params}
      data={data}
      sortParams={props.sortParams}
      setSortParams={props.setSortParams}
    ></Table>
  ) : (
    <Skeleton className={props.skeletonClassName} />
  );
}
