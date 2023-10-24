"use client";
import PaginatedTable from "components/charts/helpers/DataTable/PaginatedTable";
import Pagination from "components/charts/helpers/DataTable/Pagination";
import { SortQueryParams } from "lib/charts/types";
import { useState } from "react";
import { ConfigurationKey } from "../configurations";
import styles from "./styles.module.scss";

/** Client components that renders a paginated table
 * configurationKey: configuration to render the table
 * pages_count: number of pages this table has
 * height: expected height of the table (for skeleton)
 */
export default function DataTableClientWrapper(props: {
  configurationKey: ConfigurationKey;
  params: object;
  pages_count: number;
  skeletonClassName?: string;
  withPagination?: boolean;
}) {
  const withPagination =
  props.withPagination === undefined ? true : props.withPagination;
  const [page, setPage] = useState<number>(0);
  const [sortParams, setSortParams] = useState<SortQueryParams>({});
  return (
    <div className={styles.wrapper}>
        <PaginatedTable
          page={page}
          configurationKey={props.configurationKey}
          params={props.params}
          skeletonClassName={props.skeletonClassName}
          sortParams={sortParams}
          setSortParams={setSortParams}
        ></PaginatedTable>
        { withPagination && 
        (
      <Pagination
        page={page}
        pages_count={props.pages_count}
        onPageChange={setPage}
      ></Pagination>)
    }
    </div>
  );
}
