import { t } from "@lingui/macro";
import { palette } from "theme/palette";
import ChartCard, { CardProps } from "../../ChartCard";

import {
  TokenDetailsProps,
  propsToDetailsURL,
} from "components/cards/tokenDetails/helpers";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
import KPieChart from "components/charts/helpers/KPieChart";
import { queryAggregatedCreditsByPool } from "lib/charts/queries";
import { capitalize } from "lodash";

export default function TokenPoolBreakdownCard(
  props: CardProps & TokenDetailsProps
) {
  // No methodologies card for retired credits on particular pools
  let chart = <></>;
  switch (props.bridge) {
    case "toucan":
      /* @ts-expect-error async Server component */
      chart = <TokenPoolBreakdownChartToucanChart {...props} />;
      break;
    case "c3":
      /* @ts-expect-error async Server component */
      chart = <TokenPoolBreakdownChartC3Chart {...props} />;
      break;
    default:
      return <></>;
  }

  return (
    <ChartCard
      {...props}
      title={t`Breakdown of ${capitalize(props.bridge)} pooled`}
      detailUrl={propsToDetailsURL(props, "breakdown-of-digital-carbon")}
      chart={chart}
    />
  );
}

/** Async server component that renders a Recharts client component */
async function TokenPoolBreakdownChartToucanChart() {
  const configuration: ChartConfiguration<"bct" | "nct" | "not_pooled"> = [
    {
      id: "bct",
      label: t`BCT`,
      color: palette.charts.color5,
      legendOrder: 1,
    },
    {
      id: "nct",
      label: t`NCT`,
      color: palette.charts.color3,
      legendOrder: 2,
    },
    {
      id: "not_pooled",
      label: t`Not pooled`,
      color: palette.charts.color1,
      legendOrder: 3,
    },
  ];
  const data = await queryAggregatedCreditsByPool({ bridge: "toucan" });
  const chartData = [
    {
      quantity: data.bct_quantity,
      id: "bct",
    },
    {
      quantity: data.nct_quantity,
      id: "nct",
    },
    {
      quantity: data.not_pooled_quantity,
      id: "not_pooled",
    },
  ];

  return <KPieChart data={chartData} configuration={configuration} />;
}

/** Async server component that renders a Recharts client component */
async function TokenPoolBreakdownChartC3Chart() {
  const configuration: ChartConfiguration<"nbo" | "ubo" | "not_pooled"> = [
    {
      id: "ubo",
      label: t`UBO`,
      color: palette.charts.color5,
      legendOrder: 1,
    },
    {
      id: "nbo",
      label: t`NBO`,
      color: palette.charts.color3,
      legendOrder: 2,
    },
    {
      id: "not_pooled",
      label: t`Not pooled`,
      color: palette.charts.color1,
      legendOrder: 3,
    },
  ];
  const data = await queryAggregatedCreditsByPool({ bridge: "c3" });
  const chartData = [
    {
      quantity: data.nbo_quantity,
      id: "ubo",
    },
    {
      quantity: data.ubo_quantity,
      id: "nbo",
    },
    {
      quantity: data.not_pooled_quantity,
      id: "not_pooled",
    },
  ];
  return <KPieChart data={chartData} configuration={configuration} />;
}
