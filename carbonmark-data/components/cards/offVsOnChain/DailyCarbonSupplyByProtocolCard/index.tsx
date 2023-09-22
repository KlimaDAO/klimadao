import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import DailyCreditsChart from "components/charts/DailyCreditsChart";
import { palette } from "theme/palette";
/** Verra Credits Card */
export default function DailyCarbonSupplyByProtocolCard(props: CardProps) {
  const dateField = "bridged_date";
  const status = "bridged";
  const source = "quantity";

  const configuration = [
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

  const chart = (
    /* @ts-expect-error async Server component */
    <DailyCreditsChart configuration={configuration} />
  );

  return (
    <ChartCard
      {...props}
      title={t`Cummulative verra registry credits tokenized over time`}
      detailUrl="/details/digital-carbon-supply-snapshot"
      chart={chart}
    />
  );
}
