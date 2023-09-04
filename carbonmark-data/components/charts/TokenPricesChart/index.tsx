import { formatTonnes } from "@klimadao/lib/utils/lightIndex";
import { t } from "@lingui/macro";
import { InfoOutlined } from "@mui/icons-material";
import { formatPrice } from "lib/charts/helpers";
import { queryPrices, queryTokenInfo } from "lib/charts/queries";
import { Token } from "lib/charts/types";
import { TOKENS } from "lib/constants";
import { currentLocale } from "lib/i18n";
import {
  getTokenFullName,
  getTokenIcon,
  getTokenSelectiveFeeDescription,
} from "lib/tokens";
import { CoinTiles, CoinTilesData } from "../helpers/CoinTiles";
import styles from "./styles.module.scss";

/** Async server component  */
export default async function TokenPricesChart() {
  const locale = currentLocale();
  const priceHistory = (
    await queryPrices({ sort_by: "date", sort_order: "desc", page_size: 8 })
  ).items;
  const coinTilesData: CoinTilesData = [];
  for (let i = 0; i < TOKENS.length; i++) {
    const token: Token = TOKENS[i];
    const tokenInfo = await queryTokenInfo(token);

    if (tokenInfo) {
      const formattedCurrentSupply = formatTonnes({
        amount: tokenInfo.current_supply.toString(),
        locale,
      });
      coinTilesData.push({
        title: getTokenFullName(token),
        globalFact: t`${formattedCurrentSupply} tonnes available`,
        icon: getTokenIcon(token),
        facts: [
          {
            value: formatPrice(locale)(tokenInfo.price),
            label: t`Price per tonne`,
          },
          {
            value: formatPrice(locale)(tokenInfo.selective_cost_value),
            label: (
              <span>
                {t`Selective fee`}&nbsp;
                <span
                  className={styles.selectiveFeeIcon}
                  title={await getTokenSelectiveFeeDescription(token)}
                >
                  <InfoOutlined fontSize={"inherit"} />
                </span>
              </span>
            ),
          },
          {
            value: "l3",
            label: t`Last 7 days`,
          },
        ],
      });
    }
  }
  return <CoinTiles data={coinTilesData}></CoinTiles>;
}
