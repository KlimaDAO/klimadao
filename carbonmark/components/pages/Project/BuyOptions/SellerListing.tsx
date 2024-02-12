import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { Text } from "components/Text";
import {
  createListingPurchaseLink,
  createListingRetireLink,
  createSellerLink,
} from "lib/createUrls";
import { formatToPrice } from "lib/formatNumbers";
import {
  formatWalletAddress,
  isConnectedAddress,
} from "lib/formatWalletAddress";
import { LO } from "lib/luckyOrange";
import { Listing, Project } from "lib/types/carbonmark.types";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  listing: Listing;
  project: Project;
  isBestPrice: boolean;
};

const getFormattedDate = (timestamp: number, locale = "en") => {
  const date = new Date(timestamp * 1000); //expects milliseconds
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "short",
  }).format(date);
};

function getSellerId(seller: Listing["seller"]): string | undefined {
  if (!seller) {
    return undefined;
  }

  return seller.handle ?? formatWalletAddress(seller.id);
}

export const SellerListing: FC<Props> = (props) => {
  const { locale } = useRouter();
  const { address } = useWeb3();
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

      <div className={styles.buttons}>
        <ButtonPrimary
          label={t`Buy`}
          renderLink={(linkProps) => <Link {...linkProps} />}
          onClick={() => {
            LO.track("Purchase - Listing: Buy Clicked");
          }}
          href={createListingPurchaseLink(props.project, props.listing)}
        />
        <CarbonmarkButton
          label={t`Retire now`}
          href={createListingRetireLink(props.project, props.listing)}
          renderLink={(linkProps) => <Link {...linkProps} />}
          onClick={() => {
            LO.track("Retire - Listing: Retire Button Clicked");
          }}
        />
      </div>
    </Card>
  );
};
