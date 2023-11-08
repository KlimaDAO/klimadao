import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { DailyPolygonCarbonRetirementsChart } from "components/charts/DailyCarbonRetirementsChart";
import { PageLinks } from "lib/PageLinks";

export default function DailyPolygonRetirementsCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <DailyPolygonCarbonRetirementsChart />
  );
  return (
    <ChartCard
      {...props}
      title={t`Polygon retirements`}
      detailUrl={`${PageLinks.Supply}/digital-carbon-retirements/polygon`}
      chart={chart}
    />
  );
}
