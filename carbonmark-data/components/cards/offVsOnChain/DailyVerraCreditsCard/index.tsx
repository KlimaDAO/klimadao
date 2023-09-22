import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import DailyCreditsChart from "components/charts/DailyCreditsChart";
import { palette } from "theme/palette";
import { OffVsOnChainProps } from "../herlpers";
/** Verra Credits Card */
export default function DailyVerraCreditsCard(
  props: CardProps & OffVsOnChainProps
) {
  const dateField = "issuance_date";
  const status = "issued";
  const source = "quantity";

  const configuration = [
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

  return (
    <ChartCard
      {...props}
      title={t`Cummulative verra registry credits issued over time`}
      detailUrl="/details/digital-carbon-supply-snapshot"
      chart={chart}
    />
  );
}
