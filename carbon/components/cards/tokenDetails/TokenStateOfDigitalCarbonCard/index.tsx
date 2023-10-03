import { t } from "@lingui/macro";
import { palette } from "theme/palette";
import ChartCard, { CardProps } from "../../ChartCard";

import {
  TokenDetailsProps,
  propsToDetailsURL,
} from "components/cards/tokenDetails/helpers";
import CustomLegendItem from "components/charts/helpers/CustomLegendItem";
import { formatTonnes } from "components/charts/helpers/DataTable/configurations/helpers";
import KPieChart from "components/charts/helpers/KPieChart";
import { SimpleChartConfigurationFromType } from "lib/charts/aggregators";
import { queryAggregatedCredits } from "lib/charts/queries";
import { capitalize } from "lodash";
import styles from "./styles.module.scss";

export default function TokenStateOfDigitalCarbonCard(
  props: CardProps & TokenDetailsProps
) {
  // No methodologies card for retired credits on particular pools
  const chart = <TokenStateOfDigitalCarbonChart {...props} />;

  return (
    <ChartCard
      {...props}
      title={t`State of ${capitalize(props.bridge)} digital carbon`}
      detailUrl={propsToDetailsURL(props, "state-of-digital-carbon")}
      chart={chart}
    />
  );
}

/** Async server component that renders a Recharts client component */
async function TokenStateOfDigitalCarbonChart(props: TokenDetailsProps) {
  const bridged = (
    await queryAggregatedCredits({ bridge: props.bridge, status: "bridged" })
  ).quantity;
  const retired = (
    await queryAggregatedCredits({ bridge: props.bridge, status: "retired" })
  ).quantity;
  const outstanding = bridged - retired;
  const configuration: SimpleChartConfigurationFromType<
    "retired" | "outstanding"
  > = [
    {
      chartOptions: {
        id: "retired",
        label: t`Retired`,
        color: palette.charts.color3,
        legendOrder: 1,
      },
    },
    {
      chartOptions: {
        id: "outstanding",
        label: t`Outstanding`,
        color: palette.charts.color5,
        legendOrder: 5,
      },
    },
  ];
  const data = [
    {
      quantity: retired,
      id: "retired",
    },
    {
      quantity: outstanding,
      id: "outstanding",
    },
  ];

  return (
    <div className={styles.cardContent}>
      <div className={styles.legend}>
        <div>
          <CustomLegendItem
            color={palette.charts.color1}
            text={t`${formatTonnes(bridged)} tonnes bridged`}
          />
          <CustomLegendItem
            color={palette.charts.color3}
            text={t`${formatTonnes(retired)} tonnes retired`}
          />
          <CustomLegendItem
            color={palette.charts.color5}
            text={t`${formatTonnes(outstanding)} tonnes outstanding`}
          />
        </div>
      </div>
      <KPieChart data={data} configuration={configuration} showLegend={false} />
    </div>
  );
}
