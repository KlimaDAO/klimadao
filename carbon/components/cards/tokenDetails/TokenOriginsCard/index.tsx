import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "../../ChartCard";

import { TokenDetailsProps } from "components/cards/tokenDetails/helpers";
import DataTable from "components/charts/helpers/DataTable";
import { standardVerticalDataTableHeight } from "components/charts/helpers/DataTable/configurations/helpers";
import { creditsQueryParamsFromProps } from "lib/charts/aggregators/getAggregatedCreditsByProjects";

export default function TokenOriginsCard(props: CardProps & TokenDetailsProps) {
  const params = creditsQueryParamsFromProps(props);
  const chart = (
    /* @ts-expect-error async Server component */
    <DataTable
      configurationKey="TokenOriginsList"
      params={params}
      height={standardVerticalDataTableHeight}
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
