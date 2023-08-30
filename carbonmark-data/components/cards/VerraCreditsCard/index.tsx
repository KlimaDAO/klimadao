import { t } from "@lingui/macro";
import ChartCard from "components/cards/ChartCard";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
import VerraCreditsChart from "components/charts/VerraCreditsChart";
import {
  getCreditsBridgeOptions,
  getCreditsStatusOptions,
} from "lib/charts/options";
import {
  CreditsChartDataItem,
  CreditsChartQueryParams,
  DateField,
  Status,
} from "lib/charts/types";
import React, { Key } from "react";
import { palette } from "theme/palette";

/** Verra Credits Card */
export default function VerraCreditsCard() {
  const charts: Record<Key, React.ReactNode> = {} as Record<
    Key,
    React.ReactNode
  >;
  // Pre-compute charts for the various options combinations */
  ["onchain", "offchain"].forEach((bridge) => {
    ["issued", "retired"].forEach((stat) => {
      let queries: Array<CreditsChartQueryParams>;
      let configuration: ChartConfiguration<CreditsChartDataItem>;
      let date_field: DateField;
      let status: Status;

      if (bridge == "onchain") {
        date_field = stat == "retired" ? "retirement_date" : "bridged_date";
        status = stat == "retired" ? "retired" : "bridged";
        queries = [
          {
            key: "toucan",
            bridge: "toucan",
            status,
            date_field,
          },
          {
            key: "c3",
            bridge: "c3",
            status,
            date_field,
          },
          {
            key: "moss",
            bridge: "moss",
            status,
            date_field,
          },
        ];
        configuration = [
          {
            id: "toucan",
            label: "Toucan",
            color: palette.charts.color5,
            legendOrder: 3,
          },
          {
            id: "moss",
            label: "Moss",
            color: palette.charts.color3,
            legendOrder: 2,
          },
          {
            id: "c3",
            label: "C3",
            color: palette.charts.color1,
            legendOrder: 1,
          },
        ];
      } else {
        date_field = stat == "retired" ? "retirement_date" : "issuance_date";
        status = stat == "retired" ? "retired" : "issued";
        queries = [
          {
            key: "offchain",
            bridge: "offchain",
            status,
            date_field,
          },
        ];
        configuration = [
          {
            id: "offchain",
            label: "Offchain",
            color: palette.charts.color3,
          },
        ];
      }
      charts[`${bridge}|${stat}`] = (
        /* @ts-expect-error async Server component */
        <VerraCreditsChart
          queries={queries}
          configuration={configuration}
        ></VerraCreditsChart>
      );
    });
  });
  return (
    <ChartCard
      title={t`Verra credits`}
      detailUrl="/details/verra-credits-over-time"
      topOptions={getCreditsBridgeOptions()}
      bottomOptions={getCreditsStatusOptions()}
      charts={charts}
    />
  );
}
