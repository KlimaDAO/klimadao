import OverviewCard from "components/OverviewCard";
import Skeleton from "components/Skeleton";
import { Suspense } from "react";
/**
 * A UI layout component to position detail pages content
 */
export default function DetailPage(props: {
  chart: React.ReactNode | Promise<React.ReactNode>;
  pageTitle: string;
  chartTitle: string;
  overview: string;
}) {
  return (
    <div>
      <h1>{props.pageTitle}</h1>
      <OverviewCard title={props.chartTitle}>
        <Suspense fallback={<Skeleton />}>{props.chart}</Suspense>
      </OverviewCard>
      <div>{props.overview}</div>
    </div>
  );
}
