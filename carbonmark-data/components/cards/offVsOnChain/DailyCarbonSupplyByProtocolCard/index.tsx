import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import DailyCreditsChart from "components/charts/DailyCreditsChart";
import { statusToDateField } from "lib/charts/dateField";
import { palette } from "theme/palette";
import { OffVsOnChainProps } from "../herlpers";
/** Verra Credits Card */
export default function DailyCarbonSupplyByProtocolCard(
  props: CardProps & OffVsOnChainProps
) {
  const status = props.status == "issued" ? "bridged" : props.status;
  const dateField = statusToDateField(status);
  const source = "quantity";

  const configuration = [
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

  const chart = (
    /* @ts-expect-error async Server component */
    <DailyCreditsChart configuration={configuration} />
  );
  const title =
    props.status == "issued"
      ? t`Cummulative Verra registry credits tokenized over time`
      : t`On-Chain Verra credits retired over time`;

  return (
    <ChartCard
      {...props}
      title={title}
      detailUrl="/details/digital-carbon-supply-snapshot"
      chart={chart}
    />
  );
}
