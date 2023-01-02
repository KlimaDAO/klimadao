import React, { FC } from "react";
import { User } from "@klimadao/lib/types/marketplace";
import { Trans } from "@lingui/macro";
import { Text, ButtonPrimary } from "@klimadao/lib/components";
import { Activities } from "../Activities";
import { Stats } from "../Stats";
import { ProfileHeader } from "../ProfileHeader";
import { Listing } from "../Listing";
import {
  TwoColLayout,
  Col,
} from "components/pages/Marketplace/shared/TwoColLayout";
import { createProjectPurchaseLink } from "components/pages/Marketplace/lib/createUrls";
import { getTotalAmountSold, getTotalAmountToSell } from "../utils";

import * as styles from "./styles";

type Props = {
  marketplaceUser: User | null;
  userName: string;
};

export const SellerUnconnected: FC<Props> = (props) => {
  const userData = props.marketplaceUser;

  const sortedListings =
    !!userData?.listings?.length &&
    userData.listings
      .filter((l) => l.deleted === false)
      .sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt));

  return (
    <>
      <div className={styles.fullWidth}>
        <ProfileHeader
          userName={userData?.username || props.userName}
          isMarketplaceUser={!!userData}
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
                <Trans id="marketplace.profile.listings.empty_state">
                  No listings to show.
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
                <ButtonPrimary
                  label={<Trans id="marketplace.seller.listing.buy">Buy</Trans>}
                  className={styles.buyButton}
                  href={createProjectPurchaseLink(listing.project, listing.id)}
                />
              </Listing>
            ))}
        </Col>
        <Col>
          <Stats
            stats={{
              tonnesSold:
                (!!sortedListings && getTotalAmountSold(sortedListings)) || 0,
              tonnesOwned:
                (!!sortedListings && getTotalAmountToSell(sortedListings)) || 0,
              activeListings:
                userData?.listings.filter((l) => l.active).length || 0,
            }}
          />
          <Activities activities={userData?.activities || []} />
        </Col>
      </TwoColLayout>
    </>
  );
};
