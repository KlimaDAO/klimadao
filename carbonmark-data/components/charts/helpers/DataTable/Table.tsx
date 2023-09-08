"use client";
import { EMPTY_PAGINATED_RESPONSE } from "lib/charts/queries";
import { PaginatedResponse } from "lib/charts/types";
import { currentLocale } from "lib/i18n";
import { useEffect, useState } from "react";
import {
  ConfigurationKey,
  fetchData,
  getCardRenderer,
  getColumns,
} from "./configurations";
import { CardRenderer, Columns } from "./configurations/types";
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
  const cardRenderer = getCardRenderer(
    props.configurationKey,
    locale
  ) as CardRenderer<RI>;

  return (
    <>
      <TableLayout data={data} columns={columns}></TableLayout>
      <CardsLayout data={data} cardRenderer={cardRenderer}></CardsLayout>
    </>
  );
}

/**
 * Display data as a table
 */
function TableLayout<RI>(props: {
  data: PaginatedResponse<RI>;
  columns: Columns<RI>;
}) {
  return (
    <table className={styles.table}>
      <thead>
        <tr className={styles.header}>
          {props.columns.map((column, index) => (
            <th key={index} className={column.cellStyle}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {props.data.items.map((item, index) => (
          <tr key={index} className={styles.row}>
            {props.columns.map((column, index) => (
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

/**
 * Displays data as a cards
 */
function CardsLayout<RI>(props: {
  data: PaginatedResponse<RI>;
  cardRenderer: CardRenderer<RI>;
}) {
  return (
    <div className={styles.cards}>
      {props.data.items.map((item, index) => props.cardRenderer({ item }))}
    </div>
  );
}
