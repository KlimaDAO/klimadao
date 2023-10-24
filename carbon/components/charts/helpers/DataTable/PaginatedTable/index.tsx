import Skeleton from "components/Skeleton";
import {
  ConfigurationKey,
  fetchData,
} from "components/charts/helpers/DataTable/configurations";
import { PaginatedResponse } from "lib/charts/types";
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
    <TableHeaderClientWrapper
      configurationKey={props.configurationKey}
      params={props.params}
      data={data}
    />
  ) : (
    <Skeleton className={props.skeletonClassName} />
  );
}
