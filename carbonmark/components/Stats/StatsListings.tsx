import { trimWithLocale } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import SavingsOutlinedIcon from "@mui/icons-material/SavingsOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { Text } from "components/Text";
import { getAmountLeftToSell, getTotalAmountSold } from "lib/listingsGetter";
import { Listing } from "lib/types/carbonmark";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

interface Props {
  allListings?: Listing[];
  activeListings?: Listing[];
}

export const StatsListings: FC<Props> = (props) => {
  const { locale } = useRouter();
  const tonnesSold = !!props.allListings?.length
    ? getTotalAmountSold(props.allListings)
    : 0;

  const tonnesOwned = !!props.activeListings?.length
    ? getAmountLeftToSell(props.activeListings)
    : 0;

  const activeListings = props.activeListings?.length || 0;

  return (
    <div className={styles.list}>
      <div className={styles.listItem}>
        <Text t="body1" className={styles.itemWithIcon}>
          <StoreOutlinedIcon />
          <Trans>Tonnes sold:</Trans>
        </Text>
        <Text t="body1">{trimWithLocale(tonnesSold || 0, 2, locale)}</Text>
      </div>
      <div className={styles.listItem}>
        <Text t="body1" className={styles.itemWithIcon}>
          <SavingsOutlinedIcon />
          <Trans>Tonnes listed:</Trans>
        </Text>
        <Text t="body1"> {trimWithLocale(tonnesOwned || 0, 2, locale)}</Text>
      </div>
      <div className={styles.listItem}>
        <Text t="body1" className={styles.itemWithIcon}>
          <SellOutlinedIcon />
          <Trans>Active listings:</Trans>
        </Text>
        <Text t="body1">{activeListings || "-"}</Text>
      </div>
    </div>
  );
};
