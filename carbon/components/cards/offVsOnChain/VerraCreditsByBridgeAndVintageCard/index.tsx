import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
import KBarChart from "components/charts/helpers/KBarChart";
import { PageLinks } from "lib/PageLinks";
import { queryAggregatedCreditsByBridgeAndVintage } from "lib/charts/queries";
import { AggregatedCreditsByBridgeAndVintageItem } from "lib/charts/types";
import { palette } from "theme/palette";
import { OffVsOnChainProps } from "../helpers";

/** Verra Credits by bridge and vintage Card */
export default function VerraCreditsByBridgeAndVintageCard(
  props: CardProps & OffVsOnChainProps
) {
  const chart = (
    /* @ts-expect-error async Server component */
    <VerraCreditsByBridgeAndVintageChart {...props} />
  );
  const title = t`Credits by vintage start dates`;
  const detailUrl =
    props.status == "issued"
      ? `${PageLinks.OffChainVsOnChain}/verra-credits-issued-by-vintage-date`
      : `${PageLinks.OffChainVsOnChain}/verra-credits-retired-by-vintage-date`;

  return (
    <ChartCard
      {...props}
      title={title}
      detailUrl={detailUrl}
      chart={chart}
      className={props.className}
    />
  );
}
async function VerraCreditsByBridgeAndVintageChart(props: OffVsOnChainProps) {
  const configuration: ChartConfiguration<
    keyof AggregatedCreditsByBridgeAndVintageItem
  > = [
    {
      id: "not_bridge_quantity",
      label: "Not bridged",
      color: palette.charts.color5,
      legendOrder: 4,
    },
    {
      id: "toucan_quantity",
      label: "Toucan",
      color: palette.charts.color3,
      legendOrder: 1,
    },
    {
      id: "moss_quantity",
      label: "Moss",
      color: palette.charts.color2,
      legendOrder: 2,
    },
    {
      id: "c3_quantity",
      label: "C3",
      color: palette.charts.color1,
      legendOrder: 3,
    },
  ];
  const data = (
    await queryAggregatedCreditsByBridgeAndVintage({
      page_size: -1,
      status: props.status,
    })
  ).items;
  return (
    <KBarChart
      data={data}
      configuration={configuration}
      dateField="vintage"
      XAxis="vintage"
    ></KBarChart>
  );
}
