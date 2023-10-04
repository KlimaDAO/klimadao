"use client";
import PaginatedTable from "components/charts/helpers/DataTable/PaginatedTable";
import Pagination from "components/charts/helpers/DataTable/Pagination";
import { useState } from "react";
import { ConfigurationKey } from "../configurations";
import styles from "./styles.module.scss";

/** Client components that renders a paginated table
 * configurationKey: configuration to render the table
 * firstPageTable: A serverside render of the first page for faster initial rendering
 * pages_count: number of pages this table has
 * height: expected height of the table (for skeleton)
 */
export default function DataTableClientWrapper(props: {
  configurationKey: ConfigurationKey;
  params: object;
  firstPageTable: JSX.Element;
  pages_count: number;
  height?: number;
}) {
  const [page, setPage] = useState<number>(0);

  return (
    <div className={styles.wrapper}>
      {page == 0 && props.firstPageTable}
      {page >= 1 && (
        <PaginatedTable
          page={page}
          configurationKey={props.configurationKey}
          params={props.params}
          height={props.height}
        ></PaginatedTable>
      )}
      <Pagination
        page={page}
        pages_count={props.pages_count}
        onPageChange={setPage}
      ></Pagination>
    </div>
  );
}
