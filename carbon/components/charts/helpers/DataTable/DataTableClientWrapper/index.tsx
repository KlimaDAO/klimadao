"use client";
import Skeleton from "components/Skeleton";
import Pagination from "components/charts/helpers/DataTable/Pagination";
import { PaginatedResponse, SortQueryParams } from "lib/charts/types";
import { useEffect, useState } from "react";
import VerticalTableHeader from "../VerticalTableHeader";
import {
  ConfigurationKey,
  fetchData,
  getDesktopRenderer,
  getMobileRenderer,
} from "../configurations";
import styles from "./styles.module.scss";

/** Client components that renders a paginated table
 * configurationKey: configuration to render the table
 * params: extra query parameters;
 * pages_count: number of pages this table has
 * skeletonClassName: Classname for the squeleton
 * withPagination: Wether to display pagination or not;
 */
export default function DataTableClientWrapper<RI, P>(props: {
  configurationKey: ConfigurationKey;
  params: P;
  pages_count: number;
  skeletonClassName?: string;
  withPagination?: boolean;
}) {
  const withPagination =
    props.withPagination === undefined ? true : props.withPagination;
  const [page, setPage] = useState<number>(0);
  const [sortParams, setSortParams] = useState<SortQueryParams>({});
  const [data, setData] = useState<PaginatedResponse<RI> | undefined>(
    undefined
  );

  // Load data when parameters change
  useEffect(() => {
    setData(undefined);
    fetchData(props.configurationKey, page, props.params, sortParams).then(
      (data) => {
        /* FIXME: Unfortunately we have to hardcast this */
        setData(data as PaginatedResponse<RI>);
      }
    );
  }, [page, sortParams]);

  /** Renders a table or a skeleton if there is no data */
  function renderTable(renderer: "desktop" | "mobile") {
    if (data) {
      const Renderer =
        renderer == "desktop"
          ? getDesktopRenderer<RI, P>(props.configurationKey)
          : getMobileRenderer<RI, P>(props.configurationKey);
      return Renderer ? Renderer({ data, params: props.params }) : <></>;
    } else {
      return (
        <tbody>
          <tr>
            <td colSpan={100}>
              <Skeleton
                className={`${styles.skeleton} ${props.skeletonClassName}`}
              />
            </td>
          </tr>
        </tbody>
      );
    }
  }

  return (
    <div className={styles.wrapper}>
      <table className={`${styles.table} ${styles.desktopOnly}`}>
        <VerticalTableHeader
          sortParams={sortParams}
          setSortParams={setSortParams}
          configurationKey={props.configurationKey}
          params={props.params}
        />
        {renderTable("desktop")}
      </table>
      <table className={`${styles.table} ${styles.mobileOnly}`}>
        {renderTable("mobile")}
      </table>
      {withPagination && (
        <Pagination
          page={page}
          pages_count={props.pages_count}
          onPageChange={setPage}
        ></Pagination>
      )}
    </div>
  );
}
