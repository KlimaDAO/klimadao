import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import DataTable from "components/charts/helpers/DataTable";

export default function RetirementsByPoolListCard(props: CardProps) {
  const chart = <DataTable configurationKey="KlimaRetirementsByPoolList" />;

  return (
    <ChartCard
      {...props}
      title={t`Detailed list of KlimaDAO retirements`}
      isColumnCard={true}
      chart={chart}
    />
  );
}
