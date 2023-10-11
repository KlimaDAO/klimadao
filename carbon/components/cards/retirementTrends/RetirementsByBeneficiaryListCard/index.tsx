import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import DataTable from "components/charts/helpers/DataTable";
import layout from "theme/layout.module.scss";

export default function RetirementsByBeneficiaryListCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <DataTable
      configurationKey="KlimaRetirementsByBeneficiaryList"
      skeletonClassName={layout.tenRowsSkeleton}
    ></DataTable>
  );

  return (
    <ChartCard
      {...props}
      title={t`Detailed list of KlimaDAO retirements`}
      isColumnCard={true}
      chart={chart}
    />
  );
}
