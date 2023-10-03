import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { LoginButton } from "components/LoginButton";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { useFetchUser } from "hooks/useFetchUser";
import { createProjectPurchaseLink } from "lib/createUrls";
import { getActiveListings, getSortByUpdateListings } from "lib/listingsGetter";
import { FC } from "react";
import { Listing } from "../Listing";
import { ProfileHeader } from "../ProfileHeader";
import { ProfileSidebar } from "../ProfileSidebar";
import * as styles from "./styles";

type Props = {
  userName: string;
  userAddress: string;
};

export const SellerUnconnected: FC<Props> = (props) => {
  const { address, isConnected, toggleModal } = useWeb3();
  const { carbonmarkUser } = useFetchUser({
    params: { walletOrHandle: props.userAddress },
    //Conditionally fetch all listings if fetching for the current user
    query: { expiresAfter: address === props.userAddress ? "0" : undefined },
  });

  const activeListings = getActiveListings(carbonmarkUser?.listings ?? []);
  const hasListings = !!activeListings.length;

  const sortedListings =
    !!activeListings &&
    !!activeListings.length &&
    getSortByUpdateListings(activeListings);

  return (
    <div className={styles.container}>
      <div className={styles.userControlsRow}>
        <LoginButton className="loginButton" />
      </div>
      <div className={styles.fullWidth}>
        <ProfileHeader
          carbonmarkUser={carbonmarkUser}
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
          <ProfileSidebar
            user={carbonmarkUser}
            title={t`Data for this seller`}
          />
        </Col>
      </TwoColLayout>
    </div>
  );
};
