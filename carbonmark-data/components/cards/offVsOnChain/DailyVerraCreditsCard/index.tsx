import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import DailyCreditsChart from "components/charts/DailyCreditsChart";
import { statusToDateField } from "lib/charts/dateField";
import { palette } from "theme/palette";
import { OffVsOnChainProps } from "../herlpers";
/** Verra Credits Card */
export default function DailyVerraCreditsCard(
  props: CardProps & OffVsOnChainProps
) {
  const status = props.status;
  const dateField = statusToDateField(status);
  const source = "quantity";

  const configuration = [
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
        label: "Verra",
        color: palette.charts.color5,
        legendOrder: 1,
      },
    },
  ];

  const chart = (
    /* @ts-expect-error async Server component */
    <DailyCreditsChart configuration={configuration} />
  );
  const title =
    props.status == "issued"
      ? t`Cummulative Verra registry credits issued over time`
      : t`Off-Chain Verra credits retired over time`;

  return (
    <ChartCard
      {...props}
      title={title}
      detailUrl="/details/digital-carbon-supply-snapshot"
      chart={chart}
    />
  );
}
