import { t } from "@lingui/macro";
import DataTable from "components/charts/helpers/DataTable";
import { standardVerticalDataTableHeight } from "components/charts/helpers/DataTable/configurations/helpers";
import ChartCard, { CardProps } from "../../ChartCard";
import { OffVsOnChainProps } from "../helpers";

export default function VerraCreditsOriginCard(
  props: CardProps & OffVsOnChainProps
) {
  const params = {
    status: props.status,
  };
  const chart = (
    /* @ts-expect-error async Server component */
    <DataTable
      configurationKey="VerraCreditsOriginsList"
      params={params}
      height={standardVerticalDataTableHeight}
    />
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
