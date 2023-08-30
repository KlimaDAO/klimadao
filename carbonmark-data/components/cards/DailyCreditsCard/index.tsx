import { t } from "@lingui/macro";
import ChartCard from "components/cards/ChartCard";
import DailyCreditsChart from "components/charts/DailyCreditsChart";
import { DailyCreditsChartConfiguration } from "lib/charts/aggregators/getDailyCredits";
import {
  getCreditsBridgeOptions,
  getCreditsStatusOptions,
} from "lib/charts/options";
import { ChartDictionnary, DateField, Status } from "lib/charts/types";
import { palette } from "theme/palette";

/** Verra Credits Card */
export default function DailyVerraCreditsCard() {
  const charts: ChartDictionnary = {};

  // Pre-compute charts for the various options combinations */
  ["onchain", "offchain"].forEach((bridge) => {
    ["issued", "retired"].forEach((stat) => {
      let configuration: DailyCreditsChartConfiguration;
      let dateField: DateField;
      let status: Status;
      const source = "quantity";

      if (bridge == "onchain") {
        dateField = stat == "retired" ? "retirement_date" : "bridged_date";
        status = stat == "retired" ? "retired" : "bridged";

        configuration = [
          {
            query: {
              bridge: "toucan",
              status,
            },
            dataMapping: {
              source,
              destination: "toucan",
              dateField,
            },
            chartOptions: {
              id: "toucan",
              label: "Toucan",
              color: palette.charts.color5,
              legendOrder: 1,
            },
          },
          {
            query: {
              bridge: "moss",
              status,
            },
            dataMapping: {
              source,
              destination: "moss",
              dateField,
            },
            chartOptions: {
              id: "moss",
              label: "Moss",
              color: palette.charts.color3,
              legendOrder: 2,
            },
          },
          {
            query: {
              bridge: "c3",
              status,
            },
            dataMapping: {
              source,
              destination: "c3",
              dateField,
            },
            chartOptions: {
              id: "c3",
              label: "C3",
              color: palette.charts.color1,
              legendOrder: 3,
            },
          },
        ];
      } else {
        dateField = stat == "retired" ? "retirement_date" : "issuance_date";
        status = stat == "retired" ? "retired" : "issued";
        configuration = [
          {
            query: {
              bridge: "offchain",
              status,
            },
            dataMapping: {
              source,
              destination: "offchain",
              dateField,
            },
            chartOptions: {
              id: "offchain",
              label: "Offchain",
              color: palette.charts.color3,
            },
          },
        ];
      }
      charts[`${bridge}|${stat}`] = (
        /* @ts-expect-error async Server component */
        <DailyCreditsChart configuration={configuration}></DailyCreditsChart>
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
