"use client"

import { SortQueryParams } from "lib/charts/types";
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
  sortParams: SortQueryParams;
  setSortParams: (sortParams: SortQueryParams) => void;
}) {

  return (
    <div className={styles.table}>
      <div className={styles.desktopOnly}>
        <table className={styles.table}>
          <VerticalTableHeader sortParams={props.sortParams} setSortParams={props.setSortParams} configurationKey={props.configurationKey} params={props.params}/>
          <Table {...props} renderer="desktop" />
        </table>
      </div>
      <div className={styles.mobileOnly}>
        <table className={styles.table}>
          
        </table>
      </div>
    </div>
  );
}
