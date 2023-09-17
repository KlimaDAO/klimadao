"use client";
import PaginatedTable from "components/charts/helpers/DataTable/PaginatedTable";
import Pagination from "components/charts/helpers/DataTable/Pagination";
import { useState } from "react";
import { ConfigurationKey } from "../configurations";
import styles from "./styles.module.scss";

export default function DataTableClientWrapper(props: {
  configurationKey: ConfigurationKey;
  pages_count: number;
}) {
  const [page, setPage] = useState<number>(0);

  return (
    <div className={styles.wrapper}>
      <PaginatedTable
        page={page}
        configurationKey={props.configurationKey}
      ></PaginatedTable>
      <Pagination
        page={page}
        pages_count={props.pages_count}
        onPageChange={setPage}
      ></Pagination>
    </div>
  );
}
