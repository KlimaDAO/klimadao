import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import DataTable from "components/charts/helpers/DataTable";
import layout from "theme/layout.module.scss";

export default function RetirementsByChainListCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <DataTable
      configurationKey="KlimaRetirementsByChainList"
      skeletonClassName={layout.tenRowsSkeleton}
    />
  );

  return (
    <ChartCard
      {...props}
      title={t`Detailed list of retirements`}
      isColumnCard={true}
      chart={chart}
    />
  );
}
