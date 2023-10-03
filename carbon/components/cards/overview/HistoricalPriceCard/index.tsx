import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
import KLineChart from "components/charts/helpers/KLineChart";
import { queryPrices } from "lib/charts/queries";
import { PricesItem } from "lib/charts/types";
import { palette } from "theme/palette";

/** Historical Prices Card */
export default function HistoricalPriceCard(props: CardProps) {
  const chart = <HistoricalPriceChart />;
  return (
    <ChartCard
      {...props}
      title={t`Historical prices (USD)`}
      detailUrl="/details/price-of-digital-carbon"
      chart={chart}
    />
  );
}

/** HistoricalPrice chart */
async function HistoricalPriceChart() {
  const configuration: ChartConfiguration<keyof PricesItem> = [
    {
      id: "bct_price",
      label: "BCT",
      color: palette.charts_alternate.color1,
      legendOrder: 1,
    },
    {
      id: "nct_price",
      label: "NCT",
      color: palette.charts_alternate.color2,
      legendOrder: 2,
    },
    {
      id: "mco2_price",
      label: "MCO2",
      color: palette.charts_alternate.color3,
      legendOrder: 3,
    },
    {
      id: "ubo_price",
      label: "UBO",
      color: palette.charts_alternate.color4,
      legendOrder: 4,
    },
    {
      id: "nbo_price",
      label: "NBO",
      color: palette.charts_alternate.color5,
      legendOrder: 5,
    },
  ];
  const data = (
    await queryPrices({ sort_by: "date", sort_order: "asc", page_size: -1 })
  ).items;
  return (
    <KLineChart
      configuration={configuration}
      data={data}
      dateField="date"
      YAxis="price"
    />
  );
}
