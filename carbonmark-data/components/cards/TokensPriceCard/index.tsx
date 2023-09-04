import { t } from "@lingui/macro";
import ChartCard from "components/cards/ChartCard";
import TokenPricesChart from "components/charts/TokenPricesChart";
/** Historical Prices Card */
export default function TokensPriceCard() {
  const chart = (
    /* @ts-expect-error async Server component */
    <TokenPricesChart></TokenPricesChart>
  );
  return (
    <ChartCard
      title={t`Digital Carbon Pricing`}
      detailUrl="/details/token-prices"
      chart={chart}
      isColumnCard={true}
    />
  );
}
