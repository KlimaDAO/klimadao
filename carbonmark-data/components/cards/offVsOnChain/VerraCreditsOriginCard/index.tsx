import { t } from "@lingui/macro";
import DataTable from "components/charts/helpers/DataTable";
import ChartCard, { CardProps } from "../../ChartCard";
import { OffVsOnChainProps } from "../herlpers";

export default function VerraCreditsOriginCard(
  props: CardProps & OffVsOnChainProps
) {
  const params = {
    status: props.status,
  };
  const chart = (
    /* @ts-expect-error async Server component */
    <DataTable configurationKey="VerraCreditsOriginsList" params={params} />
  );

  return (
    <ChartCard
      {...props}
      title={t`Credits tokenized vs credits issued by origin`}
      chart={chart}
      isColumnCard={true}
    />
  );
}
