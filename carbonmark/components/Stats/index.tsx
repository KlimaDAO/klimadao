import { Text } from "@klimadao/lib/components";
import { Listing } from "@klimadao/lib/types/carbonmark";
import { trimWithLocale } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { Card } from "components/Card";
import { getAmountLeftToSell, getTotalAmountSold } from "lib/listingsGetter";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  allListings?: Listing[];
  activeListings?: Listing[];
  description?: string;
}

export const Stats: FC<Props> = (props) => {
  const { locale } = useRouter();
  const tonnesSold = props.allListings?.length
    ? getTotalAmountSold(props.allListings)
    : 0;

  const tonnesOwned = props.activeListings?.length
    ? getAmountLeftToSell(props.activeListings)
    : 0;

  const activeListings = props.activeListings?.length || 0;

  return (
    <Card>
      <Text t="h4">
        <Trans id="user.stats.title">Stats</Trans>
      </Text>
      <Text t="caption" color="lighter">
        {props.description ||
          t({
            id: "user.stats.seller.description",
            message: "Data for this seller",
          })}
      </Text>
      <div className={styles.list}>
        <div className={styles.listItem}>
          <Text t="caption" className={styles.itemWithIcon}>
            <StoreOutlinedIcon />
            <Trans>Tonnes sold:</Trans>
          </Text>
          <Text t="caption">{trimWithLocale(tonnesSold || 0, 2, locale)}</Text>
        </div>
        <div className={styles.listItem}>
          <Text t="caption" className={styles.itemWithIcon}>
            <SavingsOutlinedIcon />
            <Trans>Tonnes owned:</Trans>
          </Text>
          <Text t="caption">
            {" "}
            {trimWithLocale(tonnesOwned || 0, 2, locale)}
          </Text>
        </div>
        <div className={styles.listItem}>
          <Text t="caption" className={styles.itemWithIcon}>
            <SellOutlinedIcon />
            <Trans>Active listings:</Trans>
          </Text>
          <Text t="caption">{activeListings || "-"}</Text>
        </div>
      </div>
    </Card>
  );
};
