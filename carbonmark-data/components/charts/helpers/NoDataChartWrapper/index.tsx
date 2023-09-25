"use client"; // use client for recharts animations
import { t } from "@lingui/macro";
import { ChartData } from "lib/charts/types";
import { ReactNode } from "react";
import styles from "./styles.module.scss";

interface Props<T> {
  data: ChartData<T>;
  noDataText?: string;
  children: ReactNode;
}
/** FIXME: Refactor to KlimaBarChart */
export default function NoDataChartWrapper<T>(props: Props<T>) {
  const noDataText = props.noDataText || t`No data availble`;
  if (props.data.length) {
    return <>{props.children}</>;
  } else {
    return <div className={styles.wrapper}>{noDataText}</div>;
  }
}
