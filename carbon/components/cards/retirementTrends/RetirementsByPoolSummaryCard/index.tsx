import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import DataTable from "components/charts/helpers/DataTable";

/** Klima DAO Retirements by pool Card */
export default function RetirementsByPoolSummaryCard(props: CardProps) {
  const chart = (
    <DataTable
      configurationKey="KlimaRetirementsByPoolSummary"
      withPagination={false}
    />
  );

  return (
    <ChartCard
      {...props}
      isColumnCard={true}
      title={t`KlimaDAO retirements by pool`}
      chart={chart}
    />
  );
}
