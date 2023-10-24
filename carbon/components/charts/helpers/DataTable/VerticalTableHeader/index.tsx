"use client";
import { ExpandLess, ExpandMore, UnfoldMore } from "@mui/icons-material";
import { SortQueryParams } from "lib/charts/types";
import { ConfigurationKey, getColumns } from "../configurations";
import tableStyles from "../configurations/styles.module.scss";
import styles from "./styles.module.scss";

/** Renders a vertical table header
 *
 */

export default function VerticalTableHeader<P>(props: {
  configurationKey: ConfigurationKey;
  sortParams: SortQueryParams;
  setSortParams: (sortParams: SortQueryParams) => void;
  params: P;
}) {
  const columns = getColumns(props.configurationKey, props.params);
  const columnKeys = Object.keys(columns);

  /** Computes the sortOptions depending on the buitton clicked */
  function setSortParamsWrapper(key: string): void {
    const dataKey = columns[key].dataKey;
    let newSortParams: SortQueryParams = { ...props.sortParams };
    if (newSortParams.sort_by == dataKey) {
      switch (newSortParams.sort_order) {
        case "desc":
          newSortParams.sort_order = "asc";
          break;
        case "asc":
          newSortParams = {};
          break;
        default:
          newSortParams.sort_order = "asc";
          break;
      }
    } else {
      newSortParams.sort_by = dataKey;
      newSortParams.sort_order = "desc";
    }
    props.setSortParams(newSortParams);
  }
  /** Computes the button associated to the header */
  function sortButtonComponent(key: string): JSX.Element {
    let Element = UnfoldMore;
    const dataKey = columns[key].dataKey;

    if (props.sortParams.sort_by == dataKey) {
      Element = props.sortParams.sort_order == "asc" ? ExpandLess : ExpandMore;
    }
    return <Element onClick={() => setSortParamsWrapper(key)} />;
  }

  return (
    <thead>
      <tr className={tableStyles.header}>
        {columnKeys.map((key) => (
          <th key={key} className={columns[key].cellStyle}>
            <span className={styles.cell}>
              {columns[key].header}
              {(columns[key].sortable === undefined || columns[key].sortable) &&
                sortButtonComponent(key)}
            </span>
          </th>
        ))}
      </tr>
    </thead>
  );
}
