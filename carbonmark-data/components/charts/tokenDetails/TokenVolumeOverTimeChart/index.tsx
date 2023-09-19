import { poolsQueryParamsFromProps } from "lib/charts/aggregators/getAggregatedCreditsByProjects";
import Chart from "./Chart";

import { t } from "@lingui/macro";
import { TokenDetailsProps } from "components/cards/tokenDetails/helpers";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { statusToDateField } from "lib/charts/dateField";
import { queryMonthlyAggregatedCreditsByPool } from "lib/charts/queries";
import { MonthlyAggregatedCreditsByPoolItem, Status } from "lib/charts/types";
import { palette } from "theme/palette";

/** Async server component that renders a Recharts client component */
export default async function TokenVolumeOverTimeChart(
  props: TokenDetailsProps
) {
  const params = poolsQueryParamsFromProps(props);
  const freq = props.since == "lifetime" ? "monthly" : "daily";
  const data = (await queryMonthlyAggregatedCreditsByPool(freq, params)).items;
  const configuration: SimpleChartConfiguration<MonthlyAggregatedCreditsByPoolItem> =
    [];
  if (props.bridge == "c3" && (props.pool == "all" || props.pool == "ubo")) {
    configuration.push({
      chartOptions: {
        id: "quantity_ubo",
        label: t`UBO`,
        color: palette.charts.color1,
        legendOrder: 1,
      },
    });
  }
  if (props.bridge == "c3" && (props.pool == "all" || props.pool == "ubo")) {
    configuration.push({
      chartOptions: {
        id: "quantity_nbo",
        label: t`NBO`,
        color: palette.charts.color5,
        legendOrder: 2,
      },
    });
  }
  if (
    props.bridge == "toucan" &&
    (props.pool == "all" || props.pool == "bct")
  ) {
    configuration.push({
      chartOptions: {
        id: "quantity_bct",
        label: t`BCT`,
        color: palette.charts.color1,
        legendOrder: 1,
      },
    });
  }
  if (
    props.bridge == "toucan" &&
    (props.pool == "all" || props.pool == "nct")
  ) {
    configuration.push({
      chartOptions: {
        id: "quantity_nct",
        label: t`NCT`,
        color: palette.charts.color5,
        legendOrder: 2,
      },
    });
  }

  const dateField = statusToDateField(params.status as Status);
  return (
    <Chart data={data} configuration={configuration} dateField={dateField} />
  );
}
