import { User } from ".generated/carbonmark-api-sdk/types";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { createProjectPurchaseLink } from "lib/createUrls";
import {
  getActiveListings,
  getNonDustListings,
  getSortByUpdateListings,
} from "lib/listingsGetter";
import { FC } from "react";
import { Listing } from "../Listing";
import { ProfileHeader } from "../ProfileHeader";
import { ProfileSidebar } from "../ProfileSidebar";
import * as styles from "./styles";

type Props = {
  user: User | null;
  userName: string;
  userAddress: string;
};

export const SellerUnconnected: FC<Props> = (props) => {
  const { address, isConnected, toggleModal } = useWeb3();

  const activeListings = getNonDustListings(
    getActiveListings(props.user?.listings ?? [])
  );
  const hasListings = !!activeListings.length;

  const sortedListings =
    !!activeListings &&
    !!activeListings.length &&
    getSortByUpdateListings(activeListings);

  return (
    <div className={styles.container}>
      <div className={styles.fullWidth}>
        <ProfileHeader
          carbonmarkUser={props.user}
          userName={props.userName}
          userAddress={props.userAddress}
        />
      </div>
      <div className={styles.listings}>
        <div className={styles.listingsHeader}>
          <Text t="h4">
            <Trans>Listings</Trans>
          </Text>
        </div>
      </div>

      <TwoColLayout>
        <Col>
          {!!sortedListings &&
            sortedListings.map((listing) => (
              <Listing key={listing.id} listing={listing}>
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

                {address && isConnected && listing.project && (
                  <ButtonPrimary
                    label={<Trans id="seller.listing.buy">Buy</Trans>}
                    className={styles.buyButton}
                    href={createProjectPurchaseLink(
                      listing.project,
                      listing.id
                    )}
                  />
                )}
              </Listing>
            ))}
          {!hasListings && (
            <Text t="body1" color="lighter">
              <i>
                <Trans>No active listings.</Trans>
              </i>
            </Text>
          )}
        </Col>
        <Col>
          <ProfileSidebar user={props.user} title={t`Data for this seller`} />
        </Col>
      </TwoColLayout>
    </div>
  );
};
