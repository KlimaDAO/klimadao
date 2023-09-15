import { t } from "@lingui/macro";
import { getLatestCarbonMetrics } from "lib/charts/aggregators/getCarbonMetrics";
import { formatPercentage, formatTonnes } from "lib/charts/helpers";
import { CarbonMetricsItem, PROTOCOLS, Protocol } from "lib/charts/types";
import { getProtocolFullName, getProtocolIcon } from "lib/protocols";
import {
  CoinTiles,
  CoinTilesData,
  CoinTilesLayout,
} from "../helpers/CoinTiles";

/** Async server component
 */
export default async function KlimaDAORetirementsByTokenOverviewChart(props: {
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
