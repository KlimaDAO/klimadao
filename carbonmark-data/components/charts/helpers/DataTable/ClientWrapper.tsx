"use client";
import { useState } from "react";
import { ConfigurationKey } from "./configurations";
import Pagination from "./Pagination";
import styles from "./styles.module.scss";
import Table from "./Table";

/** A client component that handles table state */
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
