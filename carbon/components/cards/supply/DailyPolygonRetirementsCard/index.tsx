import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import { DailyPolygonCarbonRetirementsChart } from "components/charts/DailyCarbonRetirementsChart";

export default function DailyPolygonRetirementsCard(props: CardProps) {
  const chart = <DailyPolygonCarbonRetirementsChart />;
  return (
    <ChartCard
      {...props}
      title={t`Polygon retirements`}
      detailUrl="/details/digital-carbon-retirements/polygon"
      chart={chart}
    />
  );
}
