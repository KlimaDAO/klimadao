import { t } from "@lingui/macro";
import ChartCard from "components/cards/ChartCard";
import CreditsByBridgeChart from "components/charts/CreditsByBridgeChart";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
import {
  AggregatedCreditsChartQueryParams,
  Bridge,
  ChartDictionnary,
} from "lib/charts/types";
import { palette } from "theme/palette";

/** Verra Credits Card */
export default function TokenizedCreditsCard() {
  const charts: ChartDictionnary = {};
  const status = "bridged";
  const queries: Array<AggregatedCreditsChartQueryParams> = [
    {
      key: "toucan",
      bridge: "toucan",
      status,
      label: "Toucan",
      color: palette.charts.color5,
    },
    {
      key: "c3",
      bridge: "c3",
      status,
      label: "C3",
      color: palette.charts.color3,
    },
    {
      key: "moss",
      bridge: "moss",
      status,
      label: "Moss",
      color: palette.charts.color1,
    },
  ];
  const configuration: ChartConfiguration<Bridge> = [
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
  charts["default"] = (
    /* @ts-expect-error async Server component */
    <CreditsByBridgeChart
      queries={queries}
      configuration={configuration}
    ></CreditsByBridgeChart>
  );
  return (
    <ChartCard
      title={t`Tokenized Credits By Bridge`}
      detailUrl="/details/verra-credits-tokenized-by-bridge"
      charts={charts}
    />
  );
}
