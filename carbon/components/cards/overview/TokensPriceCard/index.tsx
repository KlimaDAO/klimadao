import { formatTonnes } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PercentageChange from "components/PercentageChange";
import ChartCard, { CardProps } from "components/cards/ChartCard";
import {
  CoinTiles,
  CoinTilesData,
  CoinTilesLayout,
} from "components/charts/helpers/CoinTiles";
import { formatPrice } from "lib/charts/helpers";
import { queryPrices, queryTokenInfo } from "lib/charts/queries";
import { PricesItem, Token } from "lib/charts/types";
import { TOKENS } from "lib/constants";
import { currentLocale } from "lib/i18n";
import {
  getTokenFullName,
  getTokenIcon,
  getTokenSelectiveFeeDescription,
} from "lib/tokens";
import styles from "./styles.module.scss";

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
      title={t`Digital carbon pricing`}
      detailUrl="/overview/price-of-digital-carbon"
      detailUrlPosition="bottom"
      chart={chart}
      isColumnCard={true}
    />
  );
}

/** Async server component */
async function TokenPricesChart(props: { layout: CoinTilesLayout }) {
  const locale = currentLocale();
  const prices7daysAgo: PricesItem = (
    await queryPrices({ sort_by: "date", sort_order: "desc", page_size: 8 })
  ).items[6];
  const coinTilesData: CoinTilesData = [];
  for (let i = 0; i < TOKENS.length; i++) {
    const token: Token = TOKENS[i];
    const tokenInfo = await queryTokenInfo(token);

    if (tokenInfo) {
      // Token supply
      const formattedCurrentSupply = formatTonnes({
        amount: tokenInfo.current_supply.toString(),
        locale: locale,
      });
      // Price
      const price = formatPrice(tokenInfo.price);

      // price change
      const price7DaysAgo =
        prices7daysAgo[`${token}_price` as Extract<keyof PricesItem, number>];

      // Selective cost
      const selectiveCostInfo =
        token != "mco2" ? formatPrice(tokenInfo.selective_cost_value) : "-";
      const selectiveFeeDescription =
        await getTokenSelectiveFeeDescription(token);

      coinTilesData.push({
        title: getTokenFullName(token),
        globalFact: t`${formattedCurrentSupply} tonnes available`,
        icon: getTokenIcon(token),
        facts: [
          {
            label: t`Price per tonne`,
            value: `${price}`,
          },
          {
            label: (
              <div className={styles.selectiveFee}>
                {t`Selective cost`}
                <InfoOutlinedIcon fontSize={"inherit"} />
              </div>
            ),
            value: selectiveCostInfo,
            tooltip: selectiveFeeDescription,
          },
          {
            label: t`Last 7 days`,
            value: (
              <PercentageChange
                currentValue={tokenInfo.price}
                previousValue={price7DaysAgo}
              />
            ),
          },
        ],
      });
    }
  }
  return <CoinTiles data={coinTilesData} layout={props.layout}></CoinTiles>;
}
