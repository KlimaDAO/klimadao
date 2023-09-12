import { PaginatedResponse } from "lib/charts/types";
import { CardRenderer, Columns } from "./types";

export default abstract class TableConfiguration<RI> {
  /** Function used to fetch data */
  abstract fetchFunction(page: number): Promise<PaginatedResponse<RI>>;
  /** Returns the columns (layout) for this table */
  abstract getColumns(locale: string): Columns<RI>;
  /** Returns a JSX.Element that can render data items as cards for responsive display */
  abstract cardRenderer: CardRenderer<RI>;
  /** Formats a data item value */
  formatValue(
    item: RI,
    key: Extract<keyof RI, string>,
    locale: string
  ): string | React.ReactNode {
    return this.getColumns(locale)[key].formatter(item[key] as never);
  }
}
