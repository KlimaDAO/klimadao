import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import DataTable from "components/charts/helpers/DataTable";

/** Klima DAO Retirements by pool Card */
export default function KlimaDAORetirementsByPoolSummaryCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
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
