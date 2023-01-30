import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { User } from "@klimadao/lib/types/carbonmark";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { Activities } from "components/Activities";
import { Stats } from "components/Stats";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { createProjectPurchaseLink } from "lib/createUrls";
import {
  getActiveListings,
  getAllListings,
  getAmountLeftToSell,
  getSortByUpdateListings,
  getTotalAmountSold,
} from "lib/listingsGetter";
import { FC } from "react";
import { Listing } from "../Listing";
import { ProfileHeader } from "../ProfileHeader";

import * as styles from "./styles";

type Props = {
  carbonmarkUser: User | null;
  userName: string;
};

export const SellerUnconnected: FC<Props> = (props) => {
  const { address, isConnected, toggleModal } = useWeb3();
  const userData = props.carbonmarkUser;

  const hasListings = !!userData?.listings?.length;
  const allListings = hasListings && getAllListings(userData.listings);
  const activeListings = hasListings && getActiveListings(userData.listings);

  const sortedListings =
    !!activeListings &&
    !!activeListings.length &&
    getSortByUpdateListings(activeListings);

  return (
    <>
      <div className={styles.fullWidth}>
        <ProfileHeader
          userName={userData?.username || props.userName}
          isCarbonmarkUser={!!userData}
          description={userData?.description}
        />
      </div>
      <div className={styles.listings}>
        <div className={styles.listingsHeader}>
          <Text t="h3">
            <Trans>Listings</Trans>
          </Text>

          {!sortedListings && (
            <Text t="caption" color="lighter">
              <i>
                <Trans id="profile.listings.empty_state">
                  No active listings to show.
                </Trans>
              </i>
            </Text>
          )}
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

                {address && isConnected && (
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
        </Col>
        <Col>
          <Stats
            stats={{
              tonnesSold:
                (!!allListings && getTotalAmountSold(allListings)) || 0,
              tonnesOwned:
                (!!activeListings && getAmountLeftToSell(activeListings)) || 0,
              activeListings: (!!activeListings && activeListings.length) || 0,
            }}
          />
          <Activities activities={userData?.activities || []} />
        </Col>
      </TwoColLayout>
    </>
  );
};
