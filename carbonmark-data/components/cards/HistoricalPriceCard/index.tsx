import { t } from "@lingui/macro";
import ChartCard from "components/cards/ChartCard";
import HistoricalPriceChart from "components/charts/HistoricalPriceChart";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { ChartDictionnary } from "lib/charts/types";
import { palette } from "theme/palette";
/** Historical Prices Card */
export default function HistoricalPriceCard() {
  const charts: ChartDictionnary = {};
  const configuration: SimpleChartConfiguration = [
    {
      chartOptions: {
        id: "bct_price",
        label: "BCT",
        color: palette.charts_alternate.color1,
        legendOrder: 1,
      },
    },
    {
      chartOptions: {
        id: "nct_price",
        label: "NCT",
        color: palette.charts_alternate.color2,
        legendOrder: 2,
      },
    },
    {
      chartOptions: {
        id: "mco2_price",
        label: "MCO2",
        color: palette.charts_alternate.color3,
        legendOrder: 3,
      },
    },
    {
      chartOptions: {
        id: "ubo_price",
        label: "UBO",
        color: palette.charts_alternate.color4,
        legendOrder: 4,
      },
    },
    {
      chartOptions: {
        id: "nbo_price",
        label: "NBO",
        color: palette.charts_alternate.color5,
        legendOrder: 5,
      },
    },
  ];

  charts["default"] = (
    /* @ts-expect-error async Server component */
    <HistoricalPriceChart configuration={configuration}></HistoricalPriceChart>
  );
  return (
    <ChartCard
      title={t`Historical Prices`}
      detailUrl="/details/price-of-digital-carbon"
      charts={charts}
    />
  );
}
