import { PaginatedResponse } from "lib/charts/types";
import layout from "theme/layout.module.scss";
import styles from "./styles.module.scss";
import { Columns, DataRenderer, ItemRenderer } from "./types";

/** An abstract class for table configuration
 * Generics:
 *  - RI: Type of the items representing table rows
 *  - P: Type of the parameters used to customize the table
 */
export default abstract class AbstractTableConfiguration<RI, P> {
  /** Function used to fetch data */
  abstract fetchFunction(
    page: number,
    params?: P
  ): Promise<PaginatedResponse<RI>>;
  /** Returns the columns (layout) for this table */
  abstract getColumns(params?: P): Columns<RI>;
  /** Returns a JSX.Element that can render data items for mobile */
  abstract mobileRenderer: DataRenderer<RI, P>;
  /** Returns a JSX.Element that can render data items for desktop */
  abstract desktopRenderer: DataRenderer<RI, P>;
  /** Formats a data item value */
  formatValue(
    item: RI,
    key: Extract<keyof RI, string>
  ): string | React.ReactNode {
    const column = this.getColumns()[key];
    return column ? column.formatter(item[key] as never, item) : <></>;
  }
  /** Returns the title of a column */
  getTitle(
    key: Extract<keyof RI, string>,
    params?: P
  ): string | React.ReactNode {
    return this.getColumns(params)[key].header;
  }
  /**
   * Display data as a table with items as columns
   */
  VerticalTableLayout(props: { data: PaginatedResponse<RI>; params?: P }) {
    const columns = this.getColumns(props.params);
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
  HorizontalTableLayout(props: { data: PaginatedResponse<RI>; params?: P }) {
    const columns = this.getColumns(props.params);
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
    cardRenderer: ItemRenderer<RI, P>;
    params?: P;
  }) {
    return (
      <div className={styles.cards}>
        {props.data.items.map((item) =>
          props.cardRenderer({ item, params: props.params })
        )}
      </div>
    );
  }
}
