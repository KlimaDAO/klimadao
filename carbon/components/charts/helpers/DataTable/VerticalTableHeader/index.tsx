"use client"
import { ExpandLess, ExpandMore, UnfoldMore } from "@mui/icons-material";
import { SortQueryParams } from "lib/charts/types";
import { ConfigurationKey, getColumns } from "../configurations";
import styles from "../configurations/styles.module.scss";

/** A Client Component (wannabe Server Component) that renders the actual Table
 * configurationKey: Table configuration key
 * page: the page of the dataset to render
 * height: expected height of the table (for skeleton)
 */

export default function VerticalTableHeader<P>(props: { 
  configurationKey: ConfigurationKey 
  sortParams: SortQueryParams;
  setSortParams: (sortParams: SortQueryParams) => void;
  params: P;
}) {
  const columns = getColumns(props.configurationKey, props.params);
  const columnKeys = Object.keys(columns);
  function setSortParamsWrapper(key: string): void {
    let newSortParams: SortQueryParams = {...props.sortParams};
    if (newSortParams.sort_by == key) {
      switch (newSortParams.sort_order) {
        case "asc" : newSortParams.sort_order = "desc"; break;
        case "desc" : newSortParams.sort_by = undefined; break;
        default : newSortParams.sort_order = "asc"; break;
      }
    }
    else  {
      newSortParams.sort_by = key;
      newSortParams.sort_order = "asc";
    }
    props.setSortParams(newSortParams);
  }
  function sortButtonComponent(key: string): JSX.Element {
    let Element = UnfoldMore;
    
    if (props.sortParams.sort_by == key) {
      console.log(key, props.sortParams.sort_by);
      Element = props.sortParams.sort_by == "asc" ? ExpandMore : ExpandLess
    }
    return <Element  onClick={() => setSortParamsWrapper(key)} />
  }
  return (
    <thead>
      <tr className={styles.header}>
        {columnKeys.map((key) => (
          <th key={key} className={columns[key].cellStyle}>
            {columns[key].header}
            { (columns[key].sortable === undefined || columns[key].sortable) && 
                sortButtonComponent(key) 
            }
          </th>
        ))}
      </tr>
    </thead>
  );
}
