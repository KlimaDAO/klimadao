"use client";
import Pagination from "components/charts/helpers/DataTable/Pagination";
import Table from "components/charts/helpers/DataTable/Table";
import { useState } from "react";
import { ConfigurationKey } from "../configurations";
import styles from "./styles.module.scss";

export default function ClientWrapper(props: {
  configurationKey: ConfigurationKey;
  pages_count: number;
}) {
  const [page, setPage] = useState<number>(0);

  return (
    <div className={styles.wrapper}>
      <Table page={page} configurationKey={props.configurationKey}></Table>
      <Pagination
        page={page}
        pages_count={props.pages_count}
        onPageChange={setPage}
      ></Pagination>
    </div>
  );
}
