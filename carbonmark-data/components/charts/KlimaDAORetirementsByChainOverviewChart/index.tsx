import { t } from "@lingui/macro";
import OverviewCardIcon from "components/Graphics/OverviewCardIcon";
import offChainIcon from "components/Graphics/off-chain.png";
import onChainIcon from "components/Graphics/on-chain.png";
import { getLatestCarbonMetrics } from "lib/charts/aggregators/getCarbonMetrics";
import { formatPercentage, formatTonnes } from "lib/charts/helpers";
import { queryAggregatedCredits } from "lib/charts/queries";
import { CarbonMetricsItem } from "lib/charts/types";
import {
  CoinTiles,
  CoinTilesData,
  CoinTilesLayout,
} from "../helpers/CoinTiles";

/** Async server component
 */
export default async function KlimaDAORetirementsByChainOverviewChart(props: {
  layout: CoinTilesLayout;
}) {
  const metrics: CarbonMetricsItem = await getLatestCarbonMetrics();
  const onChainTotalTonnesRetired = metrics.total_retirements;
  const onChaintotalTonnesRetiredViaKlimaDAO =
    metrics.total_klima_retirements_polygon;
  const onChainpercentageRetiredViaKlimaDAO =
    onChaintotalTonnesRetiredViaKlimaDAO / onChainTotalTonnesRetired;

  const offChainTotalTonnesRetired = (
    await queryAggregatedCredits({
      bridge: "offchain",
      status: "retired",
    })
  ).quantity;
  const offChainTotalTonnesIssued = (
    await queryAggregatedCredits({
      bridge: "offchain",
      status: "issued",
    })
  ).quantity;
  const offChainPercentageRetired =
    offChainTotalTonnesRetired / offChainTotalTonnesIssued;

  const coinTilesData: CoinTilesData = [
    {
      title: t`On-chain`,
      icon: <OverviewCardIcon icon={onChainIcon} alt="on-chain" />,
      facts: [
        {
          label: t`Total tonnes retired`,
          value: formatTonnes({
            amount: onChainTotalTonnesRetired,
            maximumFractionDigits: 0,
          }),
        },
        {
          label: t`Retired via klimaDAO`,
          value: formatPercentage({
            value: onChainpercentageRetiredViaKlimaDAO,
            fractionDigits: 2,
          }),
        },
      ],
    },
    {
      title: t`Off-chain`,
      icon: <OverviewCardIcon icon={offChainIcon} alt="on-chain" />,
      facts: [
        {
          label: t`Total tonnes retired`,
          value: formatTonnes({
            amount: offChainTotalTonnesRetired,
            maximumFractionDigits: 0,
          }),
        },
        {
          label: t`Of total retired credits`,
          value: formatPercentage({
            value: offChainPercentageRetired,
            fractionDigits: 2,
          }),
        },
      ],
    },
  ];
  return <CoinTiles data={coinTilesData} layout={props.layout}></CoinTiles>;
}
