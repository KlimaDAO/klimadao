import { Spinner, Text } from "@klimadao/lib/components";
import { t, Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "components/Modal";
import { FC, useEffect, useState } from "react";

import { Card } from "components/pages/Marketplace/shared/Card";
import { Activities } from "../Activities";
import { ProfileHeader } from "../ProfileHeader";
import { Stats } from "../Stats";
import { CreateAListingModal } from "./CreateAListingModal";
import { EditProfile } from "./Forms/EditProfile";
import { ListingEditable } from "./ListingEditable";

import { getUserAssetsData } from "../../lib/actions";
import { getUser } from "../../lib/api";
import {
  getActiveListings,
  getAllListings,
  getAmountLeftToSell,
  getTotalAmountSold,
  pollUntil,
} from "../utils";

import { MarketplaceButton } from "components/pages/Marketplace/shared/MarketplaceButton";
import {
  Col,
  TwoColLayout,
} from "components/pages/Marketplace/shared/TwoColLayout";

import { urls } from "@klimadao/lib/constants";
import { Asset, Listing, User } from "@klimadao/lib/types/marketplace";
import { getJsonRpcProvider } from "@klimadao/lib/utils";

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
  const [sortedListings, setSortedListings] = useState<Listing[] | null>(null);
  const [assetsData, setAssetsData] = useState<Asset[] | null>(null);
  const [isLoadingAssets, setIsLoadingAssets] = useState(true);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [showCreateListingModal, setShowCreateListingModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hasAssets = !!user?.assets?.length;
  const hasListings = !!user?.listings?.length;
  const allListings = hasListings && getAllListings(user.listings);
  const activeListings = hasListings && getActiveListings(user.listings);

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

          // TODO: filter assets with balance > 0
          // this will be unnecessary as soon as bezos switched to mainnet

          const assetsWithBalance = assetsData.filter(
            (a) => Number(a.balance) > 0
          );

          setAssetsData(assetsWithBalance);
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

  // update listings when user changed
  useEffect(() => {
    const sortedListings =
      activeListings &&
      !!activeListings.length &&
      activeListings.sort((a, b) => Number(b.updatedAt) - Number(a.updatedAt));

    sortedListings &&
      sortedListings.length &&
      setSortedListings(sortedListings);
  }, [user]);

  const onEditProfile = (data: User) => {
    setUser((prev) => ({ ...prev, ...data }));
    props.onToggleEditProfileModal();
  };

  const onUpdateUser = async () => {
    if (!user) return; // TS typeguard

    try {
      setIsUpdatingUser(true);

      const fetchUser = () =>
        getUser({
          user: props.userAddress,
          type: "wallet",
        });

      // API is updated when new activity exists
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
      setIsUpdatingUser(false);
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

          {!hasListings && (
            <Text t="caption" color="lighter">
              <i>
                <Trans id="marketplace.profile.listings.empty_state">
                  No active listings to show.
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
          disabled={isLoadingAssets || !hasAssets || isUpdatingUser}
          onClick={() => setShowCreateListingModal(true)}
        />
      </div>

      <TwoColLayout>
        <Col>
          {isUpdatingUser && (
            <Card>
              <Text t="caption" className={styles.loadingText}>
                <Spinner />
                <i>
                  <Trans>Updating your data...</Trans>
                </i>
              </Text>
            </Card>
          )}
          {!!sortedListings && (
            <ListingEditable
              listings={sortedListings}
              onFinishEditing={onUpdateUser}
            />
          )}
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
            description={t({
              id: "marketplace.user.stats.your_seller_data.description",
              message: "Your seller data",
            })}
          />
          <Activities
            activities={user?.activities || []}
            connectedAddress={props.userAddress}
            isLoading={isUpdatingUser}
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
          onModalClose={() => setShowCreateListingModal(false)}
          onSubmit={onUpdateUser}
          assets={assetsData}
          showModal={showCreateListingModal}
        />
      )}
    </>
  );
};
