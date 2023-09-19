import { t } from "@lingui/macro";
import { TokenDetailsProps } from "components/cards/tokenDetails/helpers";
import TokenVolumeOverTimeChart from "components/charts/tokenDetails/TokenVolumeOverTimeChart";
import ChartCard, { CardProps } from "../../ChartCard";

export default function TokenVolumeOverTimeCard(
  props: CardProps & TokenDetailsProps
) {
  const chart = (
    /* @ts-expect-error async Server component */
    <TokenVolumeOverTimeChart {...props} />
  );

  return <ChartCard {...props} title={t`Volume over time`} chart={chart} />;
}
