import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import DataTable from "components/charts/helpers/DataTable";
import { standardVerticalDataTableHeight } from "components/charts/helpers/DataTable/configurations/helpers";

export default function RetirementsByPoolListCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <DataTable
      configurationKey="KlimaRetirementsByPoolList"
      height={standardVerticalDataTableHeight}
    />
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
