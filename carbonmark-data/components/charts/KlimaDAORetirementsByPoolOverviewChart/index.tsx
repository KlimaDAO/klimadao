import { t } from "@lingui/macro";
import { getLatestCarbonMetrics } from "lib/charts/aggregators/getCarbonMetrics";
import { formatPercentage, formatTonnes } from "lib/charts/helpers";
import { CarbonMetricsItem, Token } from "lib/charts/types";
import { TOKENS } from "lib/constants";
import { getTokenFullName, getTokenIcon } from "lib/tokens";
import {
  CoinTiles,
  CoinTilesData,
  CoinTilesLayout,
} from "../helpers/CoinTiles";

/** Async server component
 */
export default async function KlimaDAORetirementsByPoolOverviewChart(props: {
  layout: CoinTilesLayout;
}) {
  const metrics: CarbonMetricsItem = await getLatestCarbonMetrics();

  const coinTilesData: CoinTilesData = [];
  for (let i = 0; i < TOKENS.length; i++) {
    const token: Token = TOKENS[i];
    // Redeemed
    let tonnesRedeemed;
    if (token == "mco2") {
      tonnesRedeemed = metrics.mco2_retired_eth;
    } else {
      tonnesRedeemed =
        metrics[
          `${token}_redeemed_polygon` as Extract<
            keyof CarbonMetricsItem,
            number
          >
        ];
    }
    const tonnesRedeemedViaKlimadao =
      metrics[
        `${token}_klima_retired_polygon` as Extract<
          keyof CarbonMetricsItem,
          number
        >
      ];
    const precentageRedeemedViaKlimadao =
      tonnesRedeemedViaKlimadao / tonnesRedeemed;
    // Price
    coinTilesData.push({
      title: getTokenFullName(token),
      icon: getTokenIcon(token),
      facts: [
        {
          label: t`Total tonnes redeemed`,
          value: formatTonnes({
            amount: tonnesRedeemed,
            maximumFractionDigits: 0,
          }),
        },
        {
          label: t`Redeemed via KlimaDAO`,
          value: formatPercentage({
            value: precentageRedeemedViaKlimadao,
            fractionDigits: 2,
          }),
        },
      ],
    });
  }
  return <CoinTiles data={coinTilesData} layout={props.layout}></CoinTiles>;
}
