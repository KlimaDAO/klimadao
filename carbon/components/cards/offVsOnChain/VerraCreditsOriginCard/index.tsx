import { t } from "@lingui/macro";
import DataTable from "components/charts/helpers/DataTable";
import layout from "theme/layout.module.scss";
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
      skeletonClassName={layout.tenRowsSkeleton}
    />
  );
  const title =
    props.status == "issued"
      ? t`Credits tokenized vs credits issued by origin`
      : t`Credits retired off-chain vs on-chain by origin`;

  return (
    <ChartCard {...props} title={title} chart={chart} isColumnCard={true} />
  );
}
