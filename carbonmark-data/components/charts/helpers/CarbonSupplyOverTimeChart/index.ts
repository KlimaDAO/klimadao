import { t } from "@lingui/macro";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { PoolQuantitiesInterface } from "lib/charts/types";
import { palette } from "theme/palette";
import { CreditsFilteringProps } from "../props";

export function getChartConfigurationForProtocols(
  props: CreditsFilteringProps
) {
  const columns: Array<keyof PoolQuantitiesInterface> = [];
  if (props.bridge == "c3" && (props.pool == "all" || props.pool == "ubo")) {
    columns.push("ubo_quantity");
  }
  if (props.bridge == "c3" && (props.pool == "all" || props.pool == "nbo")) {
    columns.push("nbo_quantity");
  }
  if (
    props.bridge == "toucan" &&
    (props.pool == "all" || props.pool == "bct")
  ) {
    columns.push("bct_quantity");
  }
  if (
    props.bridge == "toucan" &&
    (props.pool == "all" || props.pool == "nct")
  ) {
    columns.push("nct_quantity");
  }
  if (props.bridge == "moss") {
    columns.push("mco2_quantity");
  }
  return getChartConfigurationFromColumns(columns);
}

export function getChartConfigurationFromColumns(
  columns: Array<keyof PoolQuantitiesInterface>
) {
  const configuration: SimpleChartConfiguration<PoolQuantitiesInterface> = [];
  columns.forEach((column) => {
    switch (column) {
      case "ubo_quantity":
        configuration.push({
          chartOptions: {
            id: "ubo_quantity",
            label: t`UBO`,
            color: palette.charts.color1,
            legendOrder: 1,
          },
        });
        break;
      case "nbo_quantity":
        configuration.push({
          chartOptions: {
            id: "nbo_quantity",
            label: t`NBO`,
            color: palette.charts.color5,
            legendOrder: 2,
          },
        });
        break;
      case "bct_quantity":
        configuration.push({
          chartOptions: {
            id: "bct_quantity",
            label: t`BCT`,
            color: palette.charts.color1,
            legendOrder: 3,
          },
        });
        break;
      case "nct_quantity":
        configuration.push({
          chartOptions: {
            id: "nct_quantity",
            label: t`NCT`,
            color: palette.charts.color5,
            legendOrder: 4,
          },
        });
        break;
      case "mco2_quantity":
        configuration.push({
          chartOptions: {
            id: "mco2_quantity",
            label: t`MCO2`,
            color: palette.charts.color3,
            legendOrder: 5,
          },
        });
        break;
    }
  });
  return configuration;
}
