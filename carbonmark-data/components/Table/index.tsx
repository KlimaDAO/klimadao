import { PaginatedResponse } from "lib/charts/types";
import React from "react";

export type Columns<RI> = Array<{
  header: string;
  dataKey: keyof RI;
  formatter:
    | ((v: string) => string | React.ReactNode)
    | ((v: number) => string | React.ReactNode);
}>;

/** Async server component that renders a DataTable */
export default async function Table<RI>(props: {
  fetchFunction: (page: number) => Promise<PaginatedResponse<RI>>;
  columns: Columns<RI>;
}) {
  const page = 0;
  const data = await props.fetchFunction(page);
  return (
    <table>
      <tr>
        {props.columns.map((column, index) => (
          <th key={index}>{column.header}</th>
        ))}
      </tr>
      {data.items.map((item, index) => (
        <tr key={index}>
          {props.columns.map((column, index) => (
            <td key={index}>
              {column.formatter(item[column.dataKey] as never)}
            </td>
          ))}
        </tr>
      ))}
      <tr></tr>
    </table>
  );
}
