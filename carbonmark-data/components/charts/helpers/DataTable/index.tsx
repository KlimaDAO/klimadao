import DataTableClientWrapper from "components/charts/helpers/DataTable/DataTableClientWrapper";
import Table from "components/charts/helpers/DataTable/Table";
import {
  ConfigurationKey,
  fetchData,
} from "components/charts/helpers/DataTable/configurations";
import { PaginatedResponse } from "lib/charts/types";
import NoDataWrapper from "../NoDataWrapper";
/** The table component is tricky because of those two constraints:
 * - 1. Data must be fetched by server components
 * - 2. Number of pages must be known by the pagination (client component)
 * - 3. Functions cannot be passed to client components
 *
 * Because of 1 and 2 we have one server component fetching the number of pages
 * It calls a client component to handle pagination
 * The client component calls a server component to actualy render the page
 * Right now this server component is hydrated client side. But we would like it to be built server side only even when changing pages
 *
 * Because of 3 and the fact that there is a client component layer before the actual rendering of the table server side
 * all tables configurations are indexed in a dictionnary and only the dictionnary key is passed down to the final server component
 *
 */

/** An async server component that does an initial data fetching to know the number of pages this dataset has
 * configurationKey: Table configuration key
 * usePagination: Use a simple Server Component to show data without pagination
 */
export default async function DataTable<RI>(props: {
  configurationKey: ConfigurationKey;
  params: object;
  withPagination?: boolean;
}) {
  const withPagination = props.withPagination || true;
  const data = (await fetchData(
    props.configurationKey,
    0,
    props.params
  )) as PaginatedResponse<RI>;
  const firstPageTable = (
    <Table configurationKey={props.configurationKey} data={data}></Table>
  );
  return (
    <NoDataWrapper data={data.items}>
      <>
        {withPagination && (
          <DataTableClientWrapper
            configurationKey={props.configurationKey}
            params={props.params}
            pages_count={data.pages_count}
            firstPageTable={firstPageTable}
          ></DataTableClientWrapper>
        )}
        {!withPagination && <div>{firstPageTable}</div>}
      </>
    </NoDataWrapper>
  );
}
