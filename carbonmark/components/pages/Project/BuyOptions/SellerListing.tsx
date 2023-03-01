import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { Card } from "components/Card";
import { Text } from "components/Text";
import { createProjectPurchaseLink, createSellerLink } from "lib/createUrls";
import { formatBigToTonnes, formatToPrice } from "lib/formatNumbers";
import { isConnectedAddress } from "lib/formatWalletAddress";
import { ListingFormatted, Project } from "lib/types/carbonmark";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";
import * as styles from "./styles";

type Props = {
  listing: ListingFormatted;
  project: Project;
  isBestPrice: boolean;
};

const getFormattedDate = (timestamp: string, locale = "en") => {
  const date = new Date(parseInt(timestamp) * 1000); //expects milliseconds
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "short",
  }).format(date);
};

export const SellerListing: FC<Props> = (props) => {
  const { locale } = useRouter();
  const { address, isConnected, toggleModal } = useWeb3();

  const isConnectedSeller =
    !!props.listing.seller &&
    isConnectedAddress(props.listing.seller.id, address);

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
            <Link href={createSellerLink(props.listing.seller.handle)}>
              {isConnectedSeller ? "You" : "@" + props.listing.seller.handle}
            </Link>
          </Text>
        </div>
      )}
      <Text t="h4">{formatToPrice(props.listing.singleUnitPrice)}</Text>
      <Text t="body1">
        <Trans>Quantity Available:</Trans>{" "}
        {formatBigToTonnes(props.listing.leftToSell)}
      </Text>
      <div className={styles.dates}>
        <Text t="body1">
          <Trans>Created:</Trans>{" "}
          <span>{getFormattedDate(props.listing.createdAt, locale)}</span>
        </Text>
        <Text t="body1">
          <Trans>Updated:</Trans>{" "}
          <span>{getFormattedDate(props.listing.updatedAt, locale)}</span>
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
