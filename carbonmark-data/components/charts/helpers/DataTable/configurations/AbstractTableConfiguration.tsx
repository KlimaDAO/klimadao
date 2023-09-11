import { PaginatedResponse } from "lib/charts/types";
import styles from "./styles.module.scss";
import { Columns, DataRenderer, ItemRenderer } from "./types";

export default abstract class TableConfiguration<RI> {
  /** Function used to fetch data */
  abstract fetchFunction(page: number): Promise<PaginatedResponse<RI>>;
  /** Returns the columns (layout) for this table */
  abstract getColumns(locale: string): Columns<RI>;
  /** Returns a JSX.Element that can render data items for mobile */
  abstract mobileRenderer: DataRenderer<RI>;
  /** Returns a JSX.Element that can render data items for desktop */
  abstract desktopRenderer: DataRenderer<RI>;
  /** Formats a data item value */
  formatValue(
    item: RI,
    key: Extract<keyof RI, string>,
    locale: string
  ): string | React.ReactNode {
    return this.getColumns(locale)[key].formatter(item[key] as never);
  }
  /**  */
  /**
   * Display data as a table
   */
  TableLayout<RI>(props: {
    data: PaginatedResponse<RI>;
    columns: Columns<RI>;
  }) {
    const columnKeys = Object.keys(props.columns);
    const columns = props.columns;
    return (
      <table className={styles.table}>
        <thead>
          <tr className={styles.header}>
            {columnKeys.map((key) => (
              <th key={key} className={columns[key].cellStyle}>
                {columns[key].header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.items.map((item, index) => (
            <tr key={index} className={styles.row}>
              {columnKeys.map((key) => (
                <td key={key} className={columns[key].cellStyle}>
                  {columns[key].formatter(item[columns[key].dataKey] as never)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }

  /**
   * Displays data as cards
   */
  CardsLayout<RI>(props: {
    data: PaginatedResponse<RI>;
    cardRenderer: ItemRenderer<RI>;
  }) {
    return (
      <div className={styles.cards}>
        {props.data.items.map((item) => props.cardRenderer({ item }))}
      </div>
    );
  }
}
