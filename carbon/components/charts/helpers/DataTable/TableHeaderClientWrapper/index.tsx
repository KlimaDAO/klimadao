"use client"

import { SortQueryParams } from "lib/charts/types";
import { useState } from "react";
import Table from "../Table";
import VerticalTableHeader from "../VerticalTableHeader";
import {
  ConfigurationKey
} from "../configurations";
import { DataRendererProps } from "../configurations/types";
import styles from "./styles.module.scss";

/** A Server component that renders a single page Data Table */
export default function TableHeaderClientWrapper<RI, P>(props: DataRendererProps<RI, P> & {
  configurationKey: ConfigurationKey
}) {
  const [sortParams, setSortParams] = useState<SortQueryParams>({});
  console.log(sortParams);

  return (
    <div className={styles.table}>
      <div className={styles.desktopOnly}>
        <table>
          <VerticalTableHeader sortParams={sortParams} setSortParams={setSortParams} configurationKey={props.configurationKey} params={props.params}/>
          <Table {...props} renderer="desktop" />
        </table>
      </div>
      <div className={styles.mobileOnly}>
        <table>
          <Table {...props} renderer="mobile" />
        </table>
      </div>
    </div>
  );
}
