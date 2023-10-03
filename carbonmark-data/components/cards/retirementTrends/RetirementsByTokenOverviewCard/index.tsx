import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import {
  CoinTiles,
  CoinTilesData,
  CoinTilesLayout,
} from "components/charts/helpers/CoinTiles";
import { getLatestCarbonMetrics } from "lib/charts/aggregators/getCarbonMetrics";
import { formatPercentage, formatTonnes } from "lib/charts/helpers";
import { CarbonMetricsItem, PROTOCOLS, Protocol } from "lib/charts/types";
import { getProtocolFullName, getProtocolIcon } from "lib/protocols";

/** Klima DAO Retirements by token Card */
export default function RetirementsByTokenOverviewCard(props: CardProps) {
  const chart = (
    /* @ts-expect-error async Server component */
    <RetirementsByTokenOverviewChart />
  );

  return (
    <ChartCard
      {...props}
      isColumnCard={true}
      title={t`Carbon token retirements`}
      chart={chart}
    />
  );
}

/** Async server component
 */
async function RetirementsByTokenOverviewChart(props: {
  layout: CoinTilesLayout;
}) {
  const metrics: CarbonMetricsItem = await getLatestCarbonMetrics();

  const coinTilesData: CoinTilesData = [];
  for (let i = 0; i < PROTOCOLS.length; i++) {
    const protocol: Protocol = PROTOCOLS[i];
    // Retired
    let tonnesRetired;
    if (protocol == "mco2") {
      tonnesRetired = metrics.mco2_retired_eth;
    } else {
      tonnesRetired =
        metrics[
          `${protocol}_retired_polygon` as Extract<
            keyof CarbonMetricsItem,
            number
          >
        ];
    }
    let tonnesRetiredViaKlimadao =
      metrics[
        `${protocol}_klima_retired_polygon` as Extract<
          keyof CarbonMetricsItem,
          number
        >
      ];
    const precentageRetiredViaKlimadao =
      tonnesRetiredViaKlimadao / tonnesRetired;
    coinTilesData.push({
      title: getProtocolFullName(protocol),
      icon: getProtocolIcon(protocol),
      facts: [
        {
          label: t`Total tonnes redeemed`,
          value: formatTonnes({
            amount: tonnesRetired,
            maximumFractionDigits: 0,
          }),
        },
        {
          label: t`Redeemed via KlimaDAO`,
          value: formatPercentage({
            value: precentageRetiredViaKlimadao,
            fractionDigits: 2,
          }),
        },
      ],
    });
  }
  return <CoinTiles data={coinTilesData} layout={props.layout}></CoinTiles>;
}
