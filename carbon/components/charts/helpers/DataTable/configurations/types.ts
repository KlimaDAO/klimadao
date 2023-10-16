import { PaginatedResponse } from "lib/charts/types";
import React from "react";

type Formatter<RI> =
  | ((v: string, item: RI) => string | React.ReactNode)
  | ((v: number, item: RI) => string | React.ReactNode);
export interface Column<RI> {
  /** Column title */
  header: string;
  /** key in the dataset to be displayed in the column cells */
  dataKey: keyof RI;
  /** Style of the cells */
  cellStyle: string;
  /** Formatter for the data to be displayed */
  formatter: Formatter<RI>;
}

export interface Columns<RI> {
  [key: string]: Column<RI>;
}

export interface DataRendererProps<RI, P> {
  data: PaginatedResponse<RI>;
  params?: P;
}
export type DataRenderer<RI, P> = (
  props: DataRendererProps<RI, P>
) => JSX.Element;
export type ItemRenderer<RI, P> = (props: {
  item: RI;
  params?: P;
}) => JSX.Element;
