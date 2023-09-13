import { t } from "@lingui/macro";
import {
  getEthLatestCarbonMetrics,
  getPolygonLatestCarbonMetrics,
} from "lib/charts/aggregators/getCarbonMetrics";
import { formatPercentage, formatTonnes } from "lib/charts/helpers";
import {
  DailyEthCarbonMetricsItem,
  DailyPolygonCarbonMetricsItem,
  Token,
} from "lib/charts/types";
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
  const polygonMetrics: DailyPolygonCarbonMetricsItem =
    await getPolygonLatestCarbonMetrics();
  const ethMetrics: DailyEthCarbonMetricsItem =
    await getEthLatestCarbonMetrics();

  const coinTilesData: CoinTilesData = [];
  for (let i = 0; i < TOKENS.length; i++) {
    const token: Token = TOKENS[i];
    // Redeemed
    let tonnesRedeemed;
    if (token == "mco2") {
      tonnesRedeemed = ethMetrics.mco2_retired;
    } else {
      tonnesRedeemed =
        polygonMetrics[
          `${token}_redeemed` as Extract<
            keyof DailyPolygonCarbonMetricsItem,
            number
          >
        ];
    }
    const tonnesRedeemedViaKlimadao =
      polygonMetrics[
        `${token}_klima_retired` as Extract<
          keyof DailyPolygonCarbonMetricsItem,
          number
        >
      ];
    const precentageRedeemedViaKlimadao =
      tonnesRedeemedViaKlimadao / tonnesRedeemed;
    // Price
    coinTilesData.push({
      title: getTokenFullName(token),
      globalFact: "",
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
