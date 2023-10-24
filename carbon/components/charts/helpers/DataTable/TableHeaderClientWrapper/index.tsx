"use client";

import Skeleton from "components/Skeleton";
import { PaginatedResponse, SortQueryParams } from "lib/charts/types";
import Table from "../Table";
import VerticalTableHeader from "../VerticalTableHeader";
import { ConfigurationKey } from "../configurations";
import styles from "./styles.module.scss";

/** A Server component that renders a single page Data Table */
export default function TableHeaderClientWrapper<RI, P>(props: {
  data?: PaginatedResponse<RI>;
  params?: P;
  configurationKey: ConfigurationKey;
  sortParams: SortQueryParams;
  setSortParams: (sortParams: SortQueryParams) => void;
  skeletonClassName?: string;
}) {
  /** Renders a table or a skeleton if there is no data */
  function renderTable(renderer: "desktop" | "mobile") {
    const localProps = {
      data: props.data as PaginatedResponse<RI>,
      params: props.params,
      configurationKey: props.configurationKey,
      sortParams: props.sortParams,
      setSortParams: props.setSortParams,
      skeletonClassName: props.skeletonClassName,
    };
    if (props.data) {
      return <Table {...localProps} renderer={renderer} />;
    } else {
      return (
        <tr>
          <td colSpan={100}>
            <Skeleton
              className={`${styles.skeleton} ${props.skeletonClassName}`}
            />
          </td>
        </tr>
      );
    }
  }
  return (
    <div>
      <table className={`${styles.table} ${styles.desktopOnly}`}>
        <VerticalTableHeader
          sortParams={props.sortParams}
          setSortParams={props.setSortParams}
          configurationKey={props.configurationKey}
          params={props.params}
        />
        {renderTable("desktop")}
      </table>
      <table className={`${styles.table} ${styles.mobileOnly}`}>
        {renderTable("mobile")}
      </table>
    </div>
  );
}
