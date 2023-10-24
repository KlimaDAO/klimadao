"use client"
import { SortQueryParams } from "lib/charts/types";
import { Dispatch, SetStateAction } from "react";
import {
  ConfigurationKey,
  getDesktopRenderer,
  getMobileRenderer,
} from "../configurations";
import { DataRendererProps } from "../configurations/types";
import styles from "./styles.module.scss";

/** A Server component that renders a single page Data Table */
export default function Table<RI, P>(props: DataRendererProps<RI, P> & {
  configurationKey: ConfigurationKey
  sortParams: SortQueryParams
  setSortParams: Dispatch<SetStateAction<SortQueryParams>>
}) {
  const desktopRenderer = getDesktopRenderer<RI, P>(props.configurationKey);
  const mobileRenderer = getMobileRenderer<RI, P>(props.configurationKey);
  const rendererProps = { data: props.data, params: props.params, sortParams: props.sortParams, setSortParams: props.setSortParams }
  return (
    <div className={styles.table}>
      <div className={styles.desktopOnly}>
        {desktopRenderer(rendererProps)}
      </div>
      <div className={styles.mobileOnly}>
        {mobileRenderer(rendererProps)}
      </div>
    </div>
  );
}
