import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import DataTable from "components/charts/helpers/DataTable";

export default function RetirementsByChainListCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <DataTable configurationKey="KlimaRetirementsByChainList" />
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
