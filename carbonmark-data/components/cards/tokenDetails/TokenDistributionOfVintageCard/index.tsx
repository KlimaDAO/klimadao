import { t } from "@lingui/macro";
import { creditsQueryParamsFromProps } from "lib/charts/aggregators/getAggregatedCreditsByProjects";
import ChartCard, { CardProps } from "../../ChartCard";

import { TokenDetailsProps } from "components/cards/tokenDetails/helpers";
import KBarChart from "components/charts/helpers/KBarChart";
import { SimpleChartConfiguration } from "lib/charts/aggregators";
import { queryAggregatedCreditsByPoolAndVintage } from "lib/charts/queries";
import { AggregatedCreditsByPoolAndVintageItem } from "lib/charts/types";
import { palette } from "theme/palette";

export default function TokenDistributionOfVintageCard(
  props: CardProps & TokenDetailsProps
) {
  const chart = (
    /* @ts-expect-error async Server component */
    <TokenDistributionOfVintageChart {...props} />
  );

  return <ChartCard {...props} title={t`Distribution of vintage start dates`} chart={chart} />;
}

/** Async server component that renders a Recharts client component */
async function TokenDistributionOfVintageChart(props: TokenDetailsProps) {
  const params = creditsQueryParamsFromProps(props);
  const data = (await queryAggregatedCreditsByPoolAndVintage(params)).items;
  console.log(data)
  const configuration: SimpleChartConfiguration<AggregatedCreditsByPoolAndVintageItem> =
    [];
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

  return (
    <KBarChart
      data={data}
      configuration={configuration}
      dateField="vintage"
    />
  );
}
