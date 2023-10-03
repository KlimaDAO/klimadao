import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import DailyCreditsChart from "components/charts/DailyCreditsChart";
import { DailyCreditsChartConfiguration } from "lib/charts/aggregators/getDailyCredits";
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
              destination: "toucan_quantity",
              dateField,
            },
            chartOptions: {
              id: "toucan_quantity",
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
              destination: "moss_quantity",
              dateField,
            },
            chartOptions: {
              id: "moss_quantity",
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
              destination: "c3_quantity",
              dateField,
            },
            chartOptions: {
              id: "c3_quantity",
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
              destination: "offchain_quantity",
              dateField,
            },
            chartOptions: {
              id: "offchain_quantity",
              label: "Offchain",
              color: palette.charts.color3,
            },
          },
        ];
      }
      charts[`${bridge}|${stat}`] = (
        <DailyCreditsChart configuration={configuration} />
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
