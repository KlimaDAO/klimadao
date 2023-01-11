import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { User } from "@klimadao/lib/types/marketplace";
import { Trans } from "@lingui/macro";
import { createProjectPurchaseLink } from "components/pages/Marketplace/lib/createUrls";
import {
  getActiveListings,
  getAllListings,
  getAmountLeftToSell,
  getTotalAmountSold,
} from "components/pages/Marketplace/lib/listingsGetter";
import { Activities } from "components/pages/Marketplace/shared/Activities";
import { Stats } from "components/pages/Marketplace/shared/Stats";
import {
  Col,
  TwoColLayout,
} from "components/pages/Marketplace/shared/TwoColLayout";
import { FC } from "react";
import { Listing } from "../Listing";
import { ProfileHeader } from "../ProfileHeader";

import * as styles from "./styles";

type Props = {
  marketplaceUser: User | null;
  userName: string;
};

export const SellerUnconnected: FC<Props> = (props) => {
  const userData = props.marketplaceUser;

  const hasListings = !!userData?.listings?.length;
  const allListings = hasListings && getAllListings(userData.listings);
  const activeListings = hasListings && getActiveListings(userData.listings);

  const sortedListings =
    !!activeListings &&
    !!activeListings.length &&
    activeListings.sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt));

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
