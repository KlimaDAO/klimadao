import { PaginatedResponse, SortQueryParams } from "lib/charts/types";
import layout from "theme/layout.module.scss";
import styles from "./styles.module.scss";
import {
  Columns,
  DataRendererKey,
  DataRendererProps,
  ItemRenderer,
} from "./types";
/** An abstract class for table configuration
 * Generics:
 *  - RI: Type of the items representing table rows
 *  - P: Type of the parameters used to customize the table
 */
export default abstract class AbstractTableConfiguration<RI, P> {
  /** Function used to fetch data */
  abstract fetchFunction(
    page: number,
    params?: P & SortQueryParams
  ): Promise<PaginatedResponse<RI>>;
  /** Returns the columns (layout) for this table */
  abstract getColumns(params?: P): Columns<RI>;
  /** Returns a JSX.Element that can render data items for mobile */
  abstract mobileRenderer: DataRendererKey;
  /** Returns a JSX.Element that can render data items for desktop */
  abstract desktopRenderer: DataRendererKey;
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
   * A renderer that displays data as a table with items as rows
   */
  VerticalTableRenderer(props: DataRendererProps<RI, P>) {
    const columns = this.getColumns(props.params);
    const columnKeys = Object.keys(columns);
    return (
      <tbody>
        {props.data.items.map((item, index) => (
          <tr key={index} className={styles.row}>
            {columnKeys.map((key) => (
              <td key={key} className={columns[key].cellStyle}>
                <div>
                  {columns[key].formatter(
                    item[columns[key].dataKey] as never,
                    item
                  )}
                </div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
  /**
   * A renderer that display data as a table with items as columns
   */
  HorizontalTableRenderer(props: DataRendererProps<RI, P>) {
    const columns = this.getColumns(props.params);
    const columnKeys = Object.keys(columns);
    return (
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
    );
  }

  /**
   * A renderer that displays data as cards
   */
  CardsRenderer(
    props: DataRendererProps<RI, P> & {
      params?: P;
    }
  ) {
    return (
      <tbody>
        <tr>
          <td>
            <div className={styles.cards}>
              {props.data.items.map((item, index) => (
                <this.CardRenderer item={item} key={index} />
              ))}
            </div>
          </td>
        </tr>
      </tbody>
    );
  }

  CardRenderer = (props: { item: RI }) => {
    return <></>;
  };
  /**
   * A renderer that does not display data
   */
  VoidRenderer(
    props: DataRendererProps<RI, P> & {
      cardRenderer: ItemRenderer<RI, P>;
      params?: P;
    }
  ) {
    return <></>;
  }
}
