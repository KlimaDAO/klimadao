import { ButtonPrimary, ConnectModal, Text } from "@klimadao/lib/components";
import { Listing, Project } from "@klimadao/lib/types/marketplace";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import {
  createProjectPurchaseLink,
  createSellerLink,
} from "components/pages/Marketplace/lib/createUrls";
import {
  formatBigToPrice,
  formatBigToTonnes,
} from "components/pages/Marketplace/lib/formatNumbers";
import { getIsConnectedSeller } from "components/pages/Marketplace/lib/sellerGetter";
import { Card } from "components/pages/Marketplace/shared/Card";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC } from "react";

import * as styles from "./styles";

type Props = {
  listing: Listing;
  project: Project;
};

const getFormattedDate = (timestamp: string, locale = "en") => {
  const date = new Date(parseInt(timestamp) * 1000); //expects milliseconds
  return new Intl.DateTimeFormat(locale, {
    dateStyle: "short",
  }).format(date);
};

export const ProjectListing: FC<Props> = (props) => {
  const { locale } = useRouter();
  const { address } = useWeb3();

  const isConnectedSeller = getIsConnectedSeller(
    props.listing.seller.id,
    address
  );

  return (
    <Card>
      {props.listing.seller && (
        <div className={styles.sellerInfo}>
          <SellOutlinedIcon />
          <div className={styles.sellerBadge}>
            <Trans>Seller Listing</Trans>
          </div>
          <Text t="caption">
            <Link href={createSellerLink(props.listing.seller.handle)}>
              {isConnectedSeller ? "You" : "@" + props.listing.seller.handle}
            </Link>
          </Text>
        </div>
      )}
      <Text t="h5">{formatBigToPrice(props.listing.singleUnitPrice)}</Text>
      <Text t="caption">
        <Trans>Quantity Available:</Trans>{" "}
        {formatBigToTonnes(props.listing.leftToSell)}
      </Text>
      <div className={styles.dates}>
        <Text t="caption">
          <Trans>Created:</Trans>{" "}
          <span>{getFormattedDate(props.listing.createdAt, locale)}</span>
        </Text>
        <Text t="caption">
          <Trans>Updated:</Trans>{" "}
          <span>{getFormattedDate(props.listing.updatedAt, locale)}</span>
        </Text>
      </div>
      {address ? (
        <ButtonPrimary
          label="Buy"
          className={styles.buyButton}
          href={
            isConnectedSeller
              ? undefined
              : createProjectPurchaseLink(props.project, props.listing.id)
          }
          disabled={isConnectedSeller}
        />
      ) : (
        <ConnectModal
          errorMessage={t({
            message: "We had some trouble connecting. Please try again.",
            id: "connect_modal.error_message",
          })}
          torusText={t({
            message: "or continue with",
            id: "connectModal.continue",
          })}
          titles={{
            connect: t({
              id: "connect_modal.sign_in",
              message: "Sign In / Connect",
            }),
            loading: t({
              id: "connect_modal.connecting",
              message: "Connecting...",
            }),
            error: t({
              id: "connect_modal.error_title",
              message: "Connection Error",
            }),
          }}
          buttonText={t({
            id: "marketplace.project.single.connect_to_buy",
            message: "Sign In / Connect To Buy",
          })}
        />
      )}
    </Card>
  );
};
