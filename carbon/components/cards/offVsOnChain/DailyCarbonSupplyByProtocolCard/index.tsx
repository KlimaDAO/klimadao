import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import DailyCreditsChart from "components/charts/DailyCreditsChart";
import {
  DailyCreditsChartConfiguration,
  DailyCreditsQueryConfiguration,
} from "lib/charts/aggregators/getDailyCredits";
import { statusToDateField } from "lib/charts/dateField";
import { palette } from "theme/palette";
import { OffVsOnChainProps } from "../helpers";
/** Verra Credits Card */
export default function DailyCarbonSupplyByProtocolCard(
  props: CardProps & OffVsOnChainProps
) {
  const status = props.status == "issued" ? "bridged" : props.status;
  const dateField = statusToDateField(status);
  const source = "quantity";

  const chartConfiguration: DailyCreditsChartConfiguration = [
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

  const queryConfiguration: DailyCreditsQueryConfiguration = [
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

  const chart = (
    <DailyCreditsChart
      chartConfiguration={chartConfiguration}
      queryConfiguration={queryConfiguration}
    />
  );
  const title =
    props.status == "issued"
      ? t`Cummulative Verra registry credits tokenized over time`
      : t`On-Chain Verra credits retired over time`;

  const detailUrl =
    props.status == "issued"
      ? "/details/verra-credits-tokenized-over-time"
      : "/details/verra-credits-retired-on-chain-over-time";

  return (
    <ChartCard {...props} title={title} detailUrl={detailUrl} chart={chart} />
  );
}
