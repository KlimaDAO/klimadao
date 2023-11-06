import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "../../ChartCard";

import { TokenDetailsProps } from "components/cards/tokenDetails/helpers";
import DataTable from "components/charts/helpers/DataTable";
import { creditsQueryParamsFromProps } from "lib/charts/aggregators/getAggregatedCredits";
import layout from "theme/layout.module.scss";

export default function TokenOriginsCard(props: CardProps & TokenDetailsProps) {
  // No token origin card for retired credits on particular pools
  if (props.pool != "all" && props.status == "retired") {
    return <></>;
  }
  const params = creditsQueryParamsFromProps(props);
  const chart = (
    /* @ts-expect-error async Server component */
    <DataTable
      configurationKey="TokenOriginsList"
      params={params}
      skeletonClassName={layout.tenRowsSkeleton}
    />
  );

  return (
    <ChartCard
      {...props}
      title={t`Origin of credits`}
      chart={chart}
      isColumnCard={true}
    />
  );
}
