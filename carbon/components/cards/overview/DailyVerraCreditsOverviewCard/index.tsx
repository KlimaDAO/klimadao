import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import DailyCreditsChart from "components/charts/DailyCreditsChart";
import {
  DailyCreditsChartConfiguration,
  DailyCreditsQueryConfiguration,
} from "lib/charts/aggregators/getDailyCredits";
import {
  getCreditsBridgeOptions,
  getCreditsStatusOptions,
} from "lib/charts/options";
import { DateField, NodeDictionnary, Status } from "lib/charts/types";
import { palette } from "theme/palette";

/** Verra Credits Card */
export default function DailyVerraCreditsOverviewCard(props: CardProps) {
  const charts: NodeDictionnary = {};

  // Pre-compute charts for the various options combinations */
  ["onchain", "offchain"].forEach((bridge) => {
    ["issued", "retired"].forEach((stat) => {
      let queryConfiguration: DailyCreditsQueryConfiguration;
      let chartConfiguration: DailyCreditsChartConfiguration;
      let dateField: DateField;
      let status: Status;
      const source = "quantity";

      if (bridge == "onchain") {
        dateField = stat == "retired" ? "retirement_date" : "bridged_date";
        status = stat == "retired" ? "retired" : "bridged";

        queryConfiguration = [
          {
            query: {
              bridge: "toucan",
              status,
            },
            mapping: {
              source,
              destination: "toucan_quantity",
              dateField,
            },
          },
          {
            query: {
              bridge: "moss",
              status,
            },
            mapping: {
              source,
              destination: "moss_quantity",
              dateField,
            },
          },
          {
            query: {
              bridge: "c3",
              status,
            },
            mapping: {
              source,
              destination: "c3_quantity",
              dateField,
            },
          },
        ];
        chartConfiguration = [
          {
            id: "toucan_quantity",
            label: "Toucan",
            color: palette.charts.color5,
            legendOrder: 1,
          },
          {
            id: "moss_quantity",
            label: "Moss",
            color: palette.charts.color3,
            legendOrder: 2,
          },
          {
            id: "c3_quantity",
            label: "C3",
            color: palette.charts.color1,
            legendOrder: 3,
          },
        ];
      } else {
        dateField = stat == "retired" ? "retirement_date" : "issuance_date";
        status = stat == "retired" ? "retired" : "issued";
        queryConfiguration = [
          {
            query: {
              bridge: "offchain",
              status,
            },
            mapping: {
              source,
              destination: "offchain_quantity",
              dateField,
            },
          },
        ];
        chartConfiguration = [
          {
            id: "offchain_quantity",
            label: "Offchain",
            color: palette.charts.color3,
          },
        ];
      }
      charts[`${bridge}|${stat}`] = (
        <DailyCreditsChart
          chartConfiguration={chartConfiguration}
          queryConfiguration={queryConfiguration}
        />
      );
    });
  });
  return (
    <ChartCard
      {...props}
      title={t`Verra credits`}
      detailUrl="/details/verra-credits-over-time"
      topOptions={getCreditsBridgeOptions()}
      bottomOptions={getCreditsStatusOptions()}
      charts={charts}
    />
  );
}
