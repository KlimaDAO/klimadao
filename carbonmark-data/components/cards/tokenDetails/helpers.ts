import { t } from "@lingui/macro";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import {
  Bridge,
  DateFilteringOption,
  Pool,
  PoolQuantitiesInterface,
  Status,
} from "lib/charts/types";
import { palette } from "theme/palette";

export interface TokenDetailsProps {
  bridge: Bridge;
  pool: Pool;
  status: Status;
  since: DateFilteringOption;
}
export function tokenDetailChartProps(props: TokenDetailsProps) {
  return {
    bridge: props.bridge,
    pool: props.pool,
    status: props.status,
    since: props.since,
  };
}

export function getChartConfiguration<T extends PoolQuantitiesInterface>(
  props: TokenDetailsProps
) {
  const configuration: SimpleChartConfiguration<PoolQuantitiesInterface> = [];
  if (props.bridge == "c3" && (props.pool == "all" || props.pool == "ubo")) {
    configuration.push({
      chartOptions: {
        id: "ubo_quantity",
        label: t`UBO`,
        color: palette.charts.color1,
        legendOrder: 1,
      },
    });
  }
  if (props.bridge == "c3" && (props.pool == "all" || props.pool == "ubo")) {
    configuration.push({
      chartOptions: {
        id: "nbo_quantity",
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
        id: "bct_quantity",
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
        id: "nct_quantity",
        label: t`NCT`,
        color: palette.charts.color5,
        legendOrder: 2,
      },
    });
  }
  return configuration;
}
