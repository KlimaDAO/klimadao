import { t } from "@lingui/macro";
import { palette } from "theme/palette";
import ChartCard, { CardProps } from "../../ChartCard";

import {
  TokenDetailsProps,
  propsToDetailsURL,
} from "components/cards/tokenDetails/helpers";
import { ChartConfiguration } from "components/charts/helpers/Configuration";
import CustomLegendItem from "components/charts/helpers/CustomLegendItem";
import KPieChart from "components/charts/helpers/KPieChart";
import { formatPercentage, getTonsFormatter } from "lib/charts/helpers";
import { queryAggregatedCredits } from "lib/charts/queries";
import { capitalize } from "lodash";
import styles from "./styles.module.scss";

export default function TokenStateOfDigitalCarbonCard(
  props: CardProps & TokenDetailsProps
) {
  // No methodologies card for retired credits on particular pools
  const chart = (
    /* @ts-expect-error async Server component */
    <TokenStateOfDigitalCarbonChart {...props} />
  );

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
async function TokenStateOfDigitalCarbonChart(
  props: TokenDetailsProps & CardProps
) {
  const bridged = (
    await queryAggregatedCredits({ bridge: props.bridge, status: "bridged" })
  ).quantity;
  const retired = (
    await queryAggregatedCredits({ bridge: props.bridge, status: "retired" })
  ).quantity;
  const outstanding = bridged - retired;
  const configuration: ChartConfiguration<"retired" | "outstanding"> = [
    {
      id: "retired",
      label: t`Retired`,
      color: palette.charts.color1,
      legendOrder: 1,
    },
    {
      id: "outstanding",
      label: t`Outstanding`,
      color: palette.charts.color5,
      legendOrder: 5,
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
    <KPieChart
      data={data}
      configuration={configuration}
      legendContent={
        <StateOfDigitalCarbonLegendContent
          retired={retired}
          bridged={bridged}
          outstanding={outstanding}
          showPercentageInLegend={props.isDetailPage ?? false}
        />
      }
    />
  );
}
function StateOfDigitalCarbonLegendContent(props: {
  bridged: number;
  retired: number;
  outstanding: number;
  showPercentageInLegend: boolean;
}) {
  const retiredText = props.showPercentageInLegend
    ? t`${formatPercentage({
        value: props.retired / props.bridged,
        fractionDigits: 0,
      })} retired`
    : t`Retired`;
  const outstandingText = props.showPercentageInLegend
    ? t`${formatPercentage({
        value: props.outstanding / props.bridged,
        fractionDigits: 0,
      })} outstanding`
    : t`Outstanding`;
  const bridgedText = t`${getTonsFormatter(props.bridged)(
    props.bridged
  )} Bridged`;

  return (
    <div className={styles.cardContent}>
      <div className={styles.legend}>
        <div>
          <CustomLegendItem color={palette.charts.color1} text={retiredText} />
          <CustomLegendItem
            color={palette.charts.color5}
            text={outstandingText}
          />
          {bridgedText}
        </div>
      </div>
    </div>
  );
}
