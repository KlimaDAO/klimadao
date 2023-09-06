"use client";
import { EMPTY_PAGINATED_RESPONSE } from "lib/charts/queries";
import { PaginatedResponse } from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import { useEffect, useState } from "react";
import { ConfigurationKey, fetchData, getColumns } from "./configurations";
import { Columns } from "./configurations/types";
import styles from "./styles.module.scss";

/** An Client Component (wannabe Server Component) that renders a the actual Table
 * configurationKey: Table configuration key
 * page: the page of the dataset to render
 */
export default function Table<RI>(props: {
  configurationKey: ConfigurationKey;
  page: number;
}) {
  const locale = currentLocale();
  const [data, setData] = useState<PaginatedResponse<RI>>(
    EMPTY_PAGINATED_RESPONSE
  );
  useEffect(() => {
    fetchData(props.configurationKey, props.page).then((data) => {
      /* FIXME: Unfortunately we have to hardcast these */
      setData(data as PaginatedResponse<RI>);
    });
  }, [props.page]);
  const columns = getColumns(props.configurationKey, locale) as Columns<RI>;

  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.header}>
          {columns.map((column, index) => (
            <th key={index} className={column.cellStyle}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data &&
          data.items &&
          data.items.map((item, index) => (
            <tr key={index} className={styles.row}>
              {columns.map((column, index) => (
                <td key={index} className={column.cellStyle}>
                  {column.formatter(item[column.dataKey] as never)}
                </td>
              ))}
            </tr>
          ))}
      </tbody>
    </table>
  );
}
