"use client"; // use client for recharts animations
import { t } from "@lingui/macro";
import { ChartData } from "lib/charts/types";
import styles from "./styles.module.scss";

export interface NoDataWrapperProps<T> {
  data: ChartData<T>;
  noDataText?: string;
  children: React.ReactElement;
}
/** A wrapper for data components
 * Displays noDataText if there is no data to display
 * */
export default function NoDataWrapper<T>(props: NoDataWrapperProps<T>) {
  const noDataText = props.noDataText || t`No data availble`;
  if (props.data.length) {
    return <>{props.children}</>;
  } else {
    return <div className={styles.wrapper}>{noDataText}</div>;
  }
}
