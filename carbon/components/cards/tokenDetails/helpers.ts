import { t } from "@lingui/macro";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
import { PageLinks } from "lib/PageLinks";
import { creditsQueryParamsFromProps } from "lib/charts/aggregators/getAggregatedCredits";
import { DailyCreditsQueryConfiguration } from "lib/charts/aggregators/getDailyCredits";
import { statusToDateField } from "lib/charts/dateField";
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
  return `${PageLinks.TokenDetails}/${slug}/${props.bridge}?pool=${props.pool}&status=${props.status}&since=${props.since}`;
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
      color: palette.charts.color3,
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
      color: palette.charts.color3,
      legendOrder: 2,
    });
  }
  if (
    (props.bridge == "c3" || props.bridge == "toucan") &&
    props.pool == "all"
  ) {
    configuration.push({
      id: "not_pooled_quantity",
      label: t`Not pooled`,
      color: palette.charts.color5,
      legendOrder: 3,
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

export function getCreditsQueryConfiguration(
  props: TokenDetailsProps
): DailyCreditsQueryConfiguration {
  const freq = props.since == "lifetime" ? "monthly" : "daily";
  const dateField = statusToDateField(props.status);
  const params = creditsQueryParamsFromProps(props);

  const configuration: DailyCreditsQueryConfiguration = [];
  if (props.bridge == "c3" && (props.pool == "all" || props.pool == "ubo")) {
    configuration.push({
      query: { ...params, ...{ pool: "ubo" } },
      mapping: {
        source: "quantity",
        destination: "ubo_quantity",
        dateField,
      },
    });
  }
  if (props.bridge == "c3" && (props.pool == "all" || props.pool == "nbo")) {
    configuration.push({
      query: { ...params, ...{ pool: "nbo" } },
      mapping: {
        source: "quantity",
        destination: "nbo_quantity",
        dateField,
      },
    });
  }
  if (
    props.bridge == "toucan" &&
    (props.pool == "all" || props.pool == "bct")
  ) {
    configuration.push({
      query: { ...params, ...{ pool: "bct" } },
      mapping: {
        source: "quantity",
        destination: "bct_quantity",
        dateField,
      },
    });
  }
  if (
    props.bridge == "toucan" &&
    (props.pool == "all" || props.pool == "nct")
  ) {
    configuration.push({
      query: { ...params, ...{ pool: "nct" } },
      mapping: {
        source: "quantity",
        destination: "nct_quantity",
        dateField,
      },
    });
  }
  if (
    (props.bridge == "c3" || props.bridge == "toucan") &&
    props.pool == "all"
  ) {
    configuration.push({
      query: { ...params, ...{ pool: "all" } },
      mapping: {
        source: "quantity",
        destination: "total_quantity",
        dateField,
      },
    });
  }

  if (props.bridge == "moss") {
    configuration.push({
      query: { ...params },
      mapping: {
        source: "quantity",
        destination: "mco2_quantity",
        dateField,
      },
    });
  }
  return configuration;
}
