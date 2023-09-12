import { t } from "@lingui/macro";
import DataTable from "components/charts/helpers/DataTable";
import ChartCard, { CardProps } from "../ChartCard";

export default function KlimaDAORetirementsCard(props: CardProps) {
  /* @ts-expect-error async Server component */
  const chart = <DataTable configurationKey="klimaRetirements"></DataTable>;

  return (
    <ChartCard
      {...props}
      title={t`Detailed list of KlimaDAO Retirements`}
      isColumnCard={true}
      chart={chart}
    />
  );
}
