import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { DailyPolygonCarbonSupplyChart } from "components/charts/DailyCarbonSupplyChart";

export default function PolygonCarbonSupplyCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <DailyPolygonCarbonSupplyChart />
  );
  return (
    <ChartCard
      {...props}
      title={t`Polygon supply`}
      detailUrl="/details/digital-carbon-supply/polygon"
      chart={chart}
    />
  );
}
