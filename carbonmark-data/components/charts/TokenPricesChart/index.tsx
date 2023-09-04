import { formatTonnes } from "@klimadao/lib/utils/lightIndex";
import { t } from "@lingui/macro";
import { ArrowDropDown, ArrowDropUp, InfoOutlined } from "@mui/icons-material";
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
import {
  CoinTiles,
  CoinTilesData,
  CoinTilesLayout,
} from "../helpers/CoinTiles";
import styles from "./styles.module.scss";

/** Async server component
 */
export default async function TokenPricesChart(props: {
  layout: CoinTilesLayout;
}) {
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
      const price = formatPrice(locale)(tokenInfo.price);

      // price change
      const price7DaysAgo =
        prices7daysAgo[`${token}_price` as Extract<keyof PricesItem, number>];
      const priceChangePercentage =
        ((tokenInfo.price - price7DaysAgo) * 100) / tokenInfo.price;
      const priceChangeIcon =
        priceChangePercentage > 0 ? (
          <ArrowDropUp color={"success"}></ArrowDropUp>
        ) : (
          <ArrowDropDown color={"error"}></ArrowDropDown>
        );

      // Selective cost
      const selectiveCostInfo =
        token != "mco2"
          ? formatPrice(locale)(tokenInfo.selective_cost_value)
          : "-";
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
              <span className={styles.selectiveFee}>
                <span>{t`Selective fee`}</span>
                <span
                  className={styles.selectiveFeeIcon}
                  title={selectiveFeeDescription}
                >
                  <InfoOutlined fontSize={"inherit"} />
                </span>
              </span>
            ),
            value: selectiveCostInfo,
          },
          {
            label: t`Last 7 days`,
            value: (
              <span className={styles.priceChangeValue}>
                {priceChangeIcon}
                {priceChangePercentage.toFixed(0)}%
              </span>
            ),
          },
        ],
      });
    }
  }
  return <CoinTiles data={coinTilesData} layout={props.layout}></CoinTiles>;
}
