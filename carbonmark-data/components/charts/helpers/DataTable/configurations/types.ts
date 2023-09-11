import { PaginatedResponse } from "lib/charts/types";
import React from "react";

type Formatter =
  | ((v: string) => string | React.ReactNode)
  | ((v: number) => string | React.ReactNode);
interface Column<RI> {
  /** Column title */
  header: string;
  /** key in the dataset to be displayed in the column cells */
  dataKey: keyof RI;
  /** Style of the cells */
  cellStyle: string;
  /** Formatter for the data to be displayed */
  formatter: Formatter;
}

export interface Columns<RI> {
  [key: string]: Column<RI>;
}

export type DataRenderer<RI> = (props: {
  data: PaginatedResponse<RI>;
}) => JSX.Element;
export type ItemRenderer<RI> = (props: { item: RI }) => JSX.Element;
