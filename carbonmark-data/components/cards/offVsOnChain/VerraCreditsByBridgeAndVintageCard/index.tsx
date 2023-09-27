import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import KBarChart from "components/charts/helpers/KBarChart";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
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
      ? "/details/verra-credits-issued-by-vintage-date"
      : "/details/verra-credits-retired-by-vintage-date";

  return (
    <ChartCard {...props} title={title} detailUrl={detailUrl} chart={chart} />
  );
}
async function VerraCreditsByBridgeAndVintageChart(props: OffVsOnChainProps) {
  const configuration: SimpleChartConfiguration<AggregatedCreditsByBridgeAndVintageItem> =
    [
      {
        chartOptions: {
          id: "not_bridged_quantity",
          label: "Not bridged",
          color: palette.charts.color5,
          legendOrder: 4,
        },
      },
      {
        chartOptions: {
          id: "toucan_quantity",
          label: "Toucan",
          color: palette.charts.color3,
          legendOrder: 1,
        },
      },
      {
        chartOptions: {
          id: "moss_quantity",
          label: "Moss",
          color: palette.charts.color2,
          legendOrder: 2,
        },
      },
      {
        chartOptions: {
          id: "c3_quantity",
          label: "C3",
          color: palette.charts.color1,
          legendOrder: 3,
        },
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
