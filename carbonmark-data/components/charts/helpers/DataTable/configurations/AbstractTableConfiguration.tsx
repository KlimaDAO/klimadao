import { PaginatedResponse } from "lib/charts/types";
import layout from "theme/layout.module.scss";
import styles from "./styles.module.scss";
import { Columns, DataRenderer, ItemRenderer } from "./types";

export default abstract class TableConfiguration<RI> {
  /** Function used to fetch data */
  abstract fetchFunction(page: number): Promise<PaginatedResponse<RI>>;
  /** Returns the columns (layout) for this table */
  abstract getColumns(): Columns<RI>;
  /** Returns a JSX.Element that can render data items for mobile */
  abstract mobileRenderer: DataRenderer<RI>;
  /** Returns a JSX.Element that can render data items for desktop */
  abstract desktopRenderer: DataRenderer<RI>;
  /** Formats a data item value */
  formatValue(
    item: RI,
    key: Extract<keyof RI, string>
  ): string | React.ReactNode {
    const column = this.getColumns()[key];
    return column ? column.formatter(item[key] as never, item) : <></>;
  }
  /** Returns the title of a column */
  getTitle(key: Extract<keyof RI, string>): string | React.ReactNode {
    return this.getColumns()[key].header;
  }
  /**
   * Display data as a table with items as columns
   */
  VerticalTableLayout(props: { data: PaginatedResponse<RI> }) {
    const columns = this.getColumns();
    const columnKeys = Object.keys(columns);
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
                  {columns[key].formatter(
                    item[columns[key].dataKey] as never,
                    item
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
  /**
   * Display data as a table with items as rows
   */
  HorizontalTableLayout(props: { data: PaginatedResponse<RI> }) {
    const columns = this.getColumns();
    const columnKeys = Object.keys(columns);
    return (
      <table className={styles.table}>
        <tbody>
          {columnKeys.map((key) => (
            <tr key={key} className={columns[key].cellStyle}>
              <td className={layout.textLeft}>{columns[key].header}</td>
              {props.data.items.map((item, index) => (
                <td key={index} className={layout.textRight}>
                  {columns[key].formatter(
                    item[columns[key].dataKey] as never,
                    item
                  )}
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
