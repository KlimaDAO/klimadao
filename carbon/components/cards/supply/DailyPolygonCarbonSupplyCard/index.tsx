import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { DailyPolygonCarbonSupplyChart } from "components/charts/DailyCarbonSupplyChart";
import { PageLinks } from "lib/PageLinks";

export default function DailyPolygonCarbonSupplyCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <DailyPolygonCarbonSupplyChart />
  );
  return (
    <ChartCard
      {...props}
      title={t`Polygon supply`}
      detailUrl={`${PageLinks.Supply}/digital-carbon-supply/polygon`}
      chart={chart}
    />
  );
}
