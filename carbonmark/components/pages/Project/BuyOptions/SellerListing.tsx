import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { createProjectPurchaseLink, createSellerLink } from "lib/createUrls";
import { formatToPrice } from "lib/formatNumbers";
import {
  formatWalletAddress,
  isConnectedAddress,
} from "lib/formatWalletAddress";
import { LO } from "lib/luckyOrange";
import { DetailedProject, Listing } from "lib/types/carbonmark.types";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  listing: Listing;
  project: DetailedProject;
  isBestPrice: boolean;
};

const getFormattedDate = (timestamp: string, locale = "en") => {
  const date = new Date(parseInt(timestamp) * 1000); //expects milliseconds
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "short",
  }).format(date);
};

function getSellerId(seller: Listing["seller"]): string | undefined {
  if (!seller) {
    return undefined;
  }

  return seller.handle !== undefined
    ? seller.handle
    : formatWalletAddress(seller.id);
}

export const SellerListing: FC<Props> = (props) => {
  const { locale } = useRouter();
  const { address, isConnected, toggleModal } = useWeb3();
  const updatedAt = props.listing.updatedAt;
  const createdAt = props.listing.createdAt;
  const isConnectedSeller =
    !!props.listing.seller &&
    isConnectedAddress(props.listing.seller.id, address);

  const sellerId = getSellerId(props.listing.seller);

  return (
    <Card>
      {props.listing.seller && (
        <div className={styles.sellerInfo}>
          <SellOutlinedIcon />
          <div className={styles.sellerBadge}>
            <Trans>Seller Listing</Trans>
          </div>
          {props.isBestPrice && (
            <div className={styles.bestPriceBadge}>
              <Trans>Best Price</Trans>
            </div>
          )}
          <Text t="body1">
            <Link
              href={createSellerLink(
                props.listing.seller.handle ?? props.listing.seller.id
              )}
            >
              {isConnectedSeller ? "You" : "@" + sellerId}
            </Link>
          </Text>
        </div>
      )}
      <Text t="h4">{formatToPrice(props.listing.singleUnitPrice)}</Text>
      <Text t="body1">
        <Trans>Quantity Available:</Trans> {props.listing.leftToSell}
      </Text>
      <div className={styles.dates}>
        <Text t="body1">
          <Trans>Created:</Trans>{" "}
          <span>{createdAt && getFormattedDate(createdAt, locale)}</span>
        </Text>
        <Text t="body1">
          <Trans>Updated:</Trans>{" "}
          <span>{updatedAt && getFormattedDate(updatedAt, locale)}</span>
        </Text>
      </div>

      {!address && !isConnected && (
        <ButtonPrimary
          className={styles.buyButton}
          label={t({
            id: "shared.connect_to_buy",
            message: "Sign In / Connect To Buy",
          })}
          onClick={toggleModal}
        />
      )}

      {address && isConnected && (
        <ButtonPrimary
          label={t({
            id: "buy",
            message: "Buy",
          })}
          onClick={() => LO.track("Purchase: Buy Clicked")}
          className={styles.buyButton}
          href={
            isConnectedSeller
              ? undefined
              : createProjectPurchaseLink(props.project, props.listing.id)
          }
          disabled={isConnectedSeller}
        />
      )}
    </Card>
  );
};
