import { EMPTY_PAGINATED_RESPONSE } from "lib/charts/queries";
import { PaginatedResponse } from "lib/charts/types";
import { useEffect, useState } from "react";
import { ConfigurationKey, fetchData } from "../configurations";
import Table from "../Table";

/** A Client Component (wannabe Server Component) that renders the actual Table
 * configurationKey: Table configuration key
 * page: the page of the dataset to render
 */
export default function PaginatedTable<RI>(props: {
  configurationKey: ConfigurationKey;
  page: number;
}) {
  const [data, setData] = useState<PaginatedResponse<RI>>(
    EMPTY_PAGINATED_RESPONSE
  );
  useEffect(() => {
    fetchData(props.configurationKey, props.page).then((data) => {
      /* FIXME: Unfortunately we have to hardcast this */
      setData(data as PaginatedResponse<RI>);
    });
  }, [props.page]);
  return <Table configurationKey={props.configurationKey} data={data}></Table>;
}
