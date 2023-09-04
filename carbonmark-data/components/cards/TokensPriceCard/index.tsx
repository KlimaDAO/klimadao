import { t } from "@lingui/macro";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import TokenPricesChart from "components/charts/TokenPricesChart";

/** Token Prices Card */
export default function TokensPriceCard(props: CardProps) {
  const layout = props.isDetailPage ? "row" : "column";
  const chart = (
    /* @ts-expect-error async Server component */
    <TokenPricesChart layout={layout}></TokenPricesChart>
  );
  return (
    <ChartCard
      {...props}
      title={t`Digital Carbon Pricing`}
      detailUrl="/details/token-prices"
      chart={chart}
      isColumnCard={true}
    />
  );
}
