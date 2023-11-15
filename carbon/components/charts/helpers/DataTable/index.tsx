import DataTableClientWrapper from "components/charts/helpers/DataTable/DataTableClientWrapper";
import {
  ConfigurationKey,
  fetchData,
} from "components/charts/helpers/DataTable/configurations";
import { PaginatedResponse } from "lib/charts/types";
import NoDataWrapper from "../NoDataWrapper";

/** An async server component that does an initial data fetching to know the number of pages this dataset has
 * configurationKey: Table configuration key
 * params: extra query parameters;
 * withPagination: Wether to display pagination or not;
 * skeletonClassName: Classname for the squeleton
 * hideOnMobile: Whether or not this table should be displayed on mobile devices
 */
export default async function DataTable<RI>(props: {
  configurationKey: ConfigurationKey;
  params: object;
  withPagination?: boolean;
  hideOnMobile?: boolean;
  skeletonClassName?: string;
}) {
  const data = (await fetchData(
    props.configurationKey,
    0,
    props.params
  )) as PaginatedResponse<RI>;
  return (
    <NoDataWrapper data={data.items}>
      <DataTableClientWrapper
        {...props}
        pages_count={data.pages_count}
      ></DataTableClientWrapper>
    </NoDataWrapper>
  );
}
