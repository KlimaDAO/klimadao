import React, { FC, useState, useEffect } from "react";
import { t, Trans } from "@lingui/macro";
import { Text, Spinner } from "@klimadao/lib/components";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "components/Modal";

import { EditProfile } from "./EditProfile";
import { CreateAListingModal } from "./CreateAListingModal";
import { Activities } from "../Activities";
import { Stats } from "../Stats";
import { ProfileHeader } from "../ProfileHeader";
import { ListingWithEditModal } from "./ListingsWithEditModal";
import { Card } from "components/pages/Marketplace/shared/Card";

import { getUser } from "../../lib/api";
import { getUserAssetsData } from "../../lib/actions";
import { pollUntil, getTotalAmountSold, getTotalAmountToSell } from "../utils";

import {
  TwoColLayout,
  Col,
} from "components/pages/Marketplace/shared/TwoColLayout";
import { MarketplaceButton } from "components/pages/Marketplace/shared/MarketplaceButton";

import { getJsonRpcProvider } from "@klimadao/lib/utils";
import { urls } from "@klimadao/lib/constants";
import { User, Asset } from "@klimadao/lib/types/marketplace";

import * as styles from "./styles";

type Props = {
  marketplaceUser: User | null;
  userName: string;
  userAddress: string;
  showEditProfileModal: boolean;
  onToggleEditProfileModal: () => void;
};

export const SellerConnected: FC<Props> = (props) => {
  const [user, setUser] = useState<User | null>(props.marketplaceUser);
  const [assetsData, setAssetsData] = useState<Asset[] | null>(null);
  const [isLoadingAssets, setIsLoadingAssets] = useState(true);
  const [isLoadingNewListing, setIsLoadingNewListing] = useState(false);
  const [isLoadingNewActivity, setIsLoadingNewActivity] = useState(false);
  const [showCreateListingModal, setShowCreateListingModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sortedListings =
    !!user?.listings?.length &&
    user.listings
      .filter((l) => l.deleted === false)
      .sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt));
  const hasAssets = !!user?.assets?.length;

  // load Assets once
  useEffect(() => {
    if (!hasAssets) {
      setIsLoadingAssets(false);
      setErrorMessage(
        t({
          id: "marketplace.profile.missing_assets",
          message: "You do not have any c3 tokens to create a listing :(",
        })
      );
    }

    if (hasAssets && !assetsData) {
      const getAssetsData = async () => {
        try {
          const provider = getJsonRpcProvider(urls.polygonTestnetRpc);

          const assetsData = await getUserAssetsData({
            assets: user.assets,
            provider,
            userAddress: props.userAddress,
          });

          setAssetsData(assetsData);
        } catch (e) {
          console.error(e);
          setErrorMessage(
            t({
              id: "marketplace.profile.load_assets.error",
              message: "There was an error loading your assets",
            })
          );
        } finally {
          setIsLoadingAssets(false);
        }
      };

      getAssetsData();
    }
  }, [user, assetsData]);

  const onEditProfile = (data: User) => {
    setUser((prev) => ({ ...prev, ...data }));
    props.onToggleEditProfileModal();
  };

  const onAddListingSubmit = async () => {
    if (!user) return; // TS typeguard

    setShowCreateListingModal(false);
    try {
      setIsLoadingNewListing(true);

      const fetchUser = () =>
        getUser({
          user: props.userAddress,
          type: "wallet",
        });

      const listingIsAdded = (value: User) => {
        const newListingsLength = value.listings.length;
        const currentListingsLength = user.listings.length;
        return newListingsLength > currentListingsLength;
      };

      const updatedUser = await pollUntil({
        fn: fetchUser,
        validate: listingIsAdded,
        ms: 1000,
        maxAttempts: 20,
      });

      setUser((prev) => ({ ...prev, ...updatedUser }));
    } catch (e) {
      console.error("LOAD USER LISTING error", e);
      setErrorMessage(
        t({
          id: "marketplace.profile.add_listing.error",
          message: `There was an error adding your listing: ${e}`,
        })
      );
    } finally {
      setIsLoadingNewListing(false);
    }
  };

  const onUpdateActivity = async () => {
    if (!user) return; // TS typeguard

    try {
      setIsLoadingNewActivity(true);

      const fetchUser = () =>
        getUser({
          user: props.userAddress,
          type: "wallet",
        });

      const activityIsAdded = (value: User) => {
        const newActivityLength = value.activities.length;
        const currentActivityLength = user.activities.length;
        return newActivityLength > currentActivityLength;
      };

      const updatedUser = await pollUntil({
        fn: fetchUser,
        validate: activityIsAdded,
        ms: 1000,
        maxAttempts: 20,
      });

      setUser((prev) => ({ ...prev, ...updatedUser }));
    } catch (e) {
      console.error("LOAD USER ACTIVITY error", e);
      setErrorMessage(
        t({
          id: "marketplace.profile.update_activity.error",
          message: `There was an error updating your activity: ${e}`,
        })
      );
    } finally {
      setIsLoadingNewActivity(false);
    }
  };

  return (
    <>
      <div className={styles.fullWidth}>
        <ProfileHeader
          userName={user?.username || props.userName}
          isMarketplaceUser={!!user}
          description={
            user?.description ||
            t({
              id: "marketplace.profile.edit_your_profile",
              message: "Edit your profile to add a description",
            })
          }
        />
      </div>

      <div className={styles.listings}>
        <div className={styles.listingsHeader}>
          <Text t="h3">
            <Trans>Listings</Trans>
          </Text>

          {errorMessage && (
            <Text t="h5" className={styles.errorMessage}>
              <Trans>Error: </Trans> {errorMessage}
            </Text>
          )}

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

        <MarketplaceButton
          label={
            isLoadingAssets ? (
              <Spinner />
            ) : (
              <>
                <span className={styles.addListingButtonText}>
                  <Trans id="marketplace.profile.create_new_listing">
                    Create New Listing
                  </Trans>
                </span>
                <span className={styles.addListingButtonIcon}>
                  <AddIcon />
                </span>
              </>
            )
          }
          disabled={isLoadingAssets || !hasAssets || isLoadingNewListing}
          onClick={() => setShowCreateListingModal(true)}
        />
      </div>

      <TwoColLayout>
        <Col>
          {isLoadingNewListing && (
            <Card>
              <Text t="caption" className={styles.loadingText}>
                <Spinner />
                <i>
                  <Trans>Loading new Listing...</Trans>
                </i>
              </Text>
            </Card>
          )}
          {!!sortedListings && (
            <ListingWithEditModal
              listings={sortedListings}
              onUpdateUserActivity={onUpdateActivity}
            />
          )}
        </Col>

        <Col>
          <Stats
            stats={{
              tonnesSold:
                (!!sortedListings && getTotalAmountSold(sortedListings)) || 0,
              tonnesOwned:
                (!!sortedListings && getTotalAmountToSell(sortedListings)) || 0,
              activeListings:
                user?.listings.filter((l) => l.active).length || 0,
            }}
            description={t({
              id: "marketplace.user.stats.your_seller_data.description",
              message: "Your seller data",
            })}
          />
          <Activities
            activities={user?.activities || []}
            connectedAddress={props.userAddress}
            isLoading={isLoadingNewActivity}
          />
        </Col>
      </TwoColLayout>

      <Modal
        title={t({
          id: "marketplace.profile.edit_profile.title",
          message: "Your Profile",
        })}
        showModal={props.showEditProfileModal}
        onToggleModal={props.onToggleEditProfileModal}
      >
        <EditProfile user={user} onSubmit={onEditProfile} />
      </Modal>

      {!!assetsData?.length && (
        <CreateAListingModal
          onCancel={() => setShowCreateListingModal(false)}
          onSubmit={onAddListingSubmit}
          assets={assetsData}
          showModal={showCreateListingModal}
        />
      )}
    </>
  );
};
