import { t } from "@lingui/macro";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
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
export function propsToDetailsURL(props: TokenDetailsProps, slug: string) {
  return `/details/${slug}/${props.bridge}?pool=${props.pool}&status=${props.status}&since=${props.since}`;
}
export function getChartConfiguration(props: TokenDetailsProps) {
  const configuration: ChartConfiguration<keyof PoolQuantitiesInterface> = [];
  if (props.bridge == "c3" && (props.pool == "all" || props.pool == "ubo")) {
    configuration.push({
      id: "ubo_quantity",
      label: t`UBO`,
      color: palette.charts.color1,
      legendOrder: 1,
    });
  }
  if (props.bridge == "c3" && (props.pool == "all" || props.pool == "nbo")) {
    configuration.push({
      id: "nbo_quantity",
      label: t`NBO`,
      color: palette.charts.color5,
      legendOrder: 2,
    });
  }
  if (
    props.bridge == "toucan" &&
    (props.pool == "all" || props.pool == "bct")
  ) {
    configuration.push({
      id: "bct_quantity",
      label: t`BCT`,
      color: palette.charts.color1,
      legendOrder: 1,
    });
  }
  if (
    props.bridge == "toucan" &&
    (props.pool == "all" || props.pool == "nct")
  ) {
    configuration.push({
      id: "nct_quantity",
      label: t`NCT`,
      color: palette.charts.color5,
      legendOrder: 2,
    });
  }
  if (props.bridge == "moss") {
    configuration.push({
      id: "mco2_quantity",
      label: t`MCO2`,
      color: palette.charts.color3,
      legendOrder: 2,
    });
  }
  return configuration;
}
