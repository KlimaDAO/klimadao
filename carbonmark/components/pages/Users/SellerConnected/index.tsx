import { t, Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import { Activities } from "components/Activities";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { CreateListing } from "components/CreateListing";
import { LoginButton } from "components/LoginButton";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import { Stats } from "components/Stats";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { addProjectsToAssets } from "lib/actions";
import { getUser } from "lib/api";
import { getAssetsWithProjectTokens } from "lib/getAssetsData";
import {
  getActiveListings,
  getAllListings,
  getSortByUpdateListings,
} from "lib/listingsGetter";
import { pollUntil } from "lib/pollUntil";
import { AssetForListing, User } from "lib/types/carbonmark";
import { FC, useEffect, useState } from "react";
import { ProfileButton } from "../ProfileButton";
import { ProfileHeader } from "../ProfileHeader";
import { EditProfile } from "./Forms/EditProfile";
import { ListingEditable } from "./ListingEditable";
import * as styles from "./styles";

type Props = {
  carbonmarkUser: User | null;
  userName: string;
  userAddress: string;
};

export const SellerConnected: FC<Props> = (props) => {
  const [user, setUser] = useState<User | null>(props.carbonmarkUser);
  const [assetsData, setAssetsData] = useState<AssetForListing[] | null>(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [showCreateListingModal, setShowCreateListingModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isCarbonmarkUser = !!user;
  const hasAssets = !!user?.assets?.length;
  const allListings = getAllListings(user?.listings ?? []);
  const activeListings = getActiveListings(user?.listings ?? []);
  const sortedListings = getSortByUpdateListings(activeListings);
  const hasListings = !!activeListings.length;

  // load Assets every time user changed
  useEffect(() => {
    // stop loading assets when there are no assets to load
    if (isCarbonmarkUser && !hasAssets) {
      setIsLoadingAssets(false);
    }

    if (hasAssets) {
      const getProjectData = async () => {
        try {
          setIsLoadingAssets(true);

          const assetWithProjectTokens = getAssetsWithProjectTokens(
            user.assets
          );

          if (assetWithProjectTokens.length) {
            const assetsData = await addProjectsToAssets({
              assets: assetWithProjectTokens,
            });

            // TODO: filter assets with balance > 0
            // this will be unnecessary as soon as bezos switched to mainnet

            const assetsWithBalance = assetsData.filter(
              (a) => Number(a.balance) > 0
            );

            if (assetsWithBalance.length) {
              setAssetsData(assetsWithBalance);
            }
          }
        } catch (e) {
          console.error(e);
          setErrorMessage(t`There was an error loading your assets. ${e}`);
        } finally {
          setIsLoadingAssets(false);
        }
      };

      getProjectData();
    }
  }, [user]);

  const onEditProfile = async (data: User) => {
    try {
      setErrorMessage("");
      if (isCarbonmarkUser) {
        setUser((prev) => ({ ...prev, ...data }));
      } else {
        // for a new user, get all data from backend
        const newUser = await getUser({
          user: props.userAddress,
          type: "wallet",
        });
        setUser((prev) => ({ ...prev, ...newUser }));
      }
    } catch (error) {
      console.error("GET NEW USER DATA error", error);
      setErrorMessage(t`There was an error getting your data: ${error}`);
    } finally {
      setShowEditProfileModal(false);
    }
  };

  const onUpdateUser = async () => {
    if (!user) return; // TS typeguard

    try {
      setErrorMessage("");
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
        maxAttempts: 50,
      });

      setUser((prev) => ({ ...prev, ...updatedUser }));
    } catch (e) {
      console.error("LOAD USER ACTIVITY error", e);
      setErrorMessage(
        t`Please refresh the page. There was an error updating your data: ${e}.`
      );
    } finally {
      setIsUpdatingUser(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.userControlsRow}>
        <ProfileButton onClick={() => setShowEditProfileModal(true)} />
        <LoginButton className="loginButton" />
      </div>
      <div className={styles.fullWidth}>
        <ProfileHeader
          userName={user?.username || props.userName}
          isCarbonmarkUser={isCarbonmarkUser}
          description={user?.description}
          profileImgUrl={user?.profileImgUrl}
        />
      </div>
      <div className={styles.listings}>
        <div className={styles.listingsHeader}>
          <Text t="h4">
            <Trans>Listings</Trans>
          </Text>

          {errorMessage && (
            <Text t="h5" className={styles.errorMessage}>
              {errorMessage}
            </Text>
          )}
        </div>
        <CarbonmarkButton
          label={
            isLoadingAssets ? (
              <Spinner />
            ) : (
              <>
                <span className={styles.addListingButtonText}>
                  <Trans id="profile.create_new_listing">
                    Create New Listing
                  </Trans>
                </span>
                <span className={styles.addListingButtonIcon}>
                  <AddIcon />
                </span>
              </>
            )
          }
          disabled={
            isLoadingAssets ||
            !hasAssets ||
            isUpdatingUser ||
            !assetsData?.length
          }
          onClick={() => setShowCreateListingModal(true)}
        />
      </div>

      <TwoColLayout>
        <Col>
          {isUpdatingUser && (
            <Card>
              <Text t="body1" className={styles.loadingText}>
                <Spinner />
                <i>
                  <Trans>Updating your data...</Trans>
                </i>
              </Text>
            </Card>
          )}
          {!hasListings && (
            <Text t="body1" color="lighter">
              <i>
                <Trans>No active listings.</Trans>
              </i>
            </Text>
          )}
          {!!sortedListings && (
            <ListingEditable
              listings={sortedListings}
              onFinishEditing={onUpdateUser}
              assets={assetsData || []}
            />
          )}
        </Col>

        <Col>
          <Stats
            allListings={allListings || []}
            activeListings={activeListings || []}
            description={t`Your seller data`}
          />
          <Activities
            activities={user?.activities || []}
            isLoading={isUpdatingUser}
          />
        </Col>
      </TwoColLayout>

      <Modal
        title={t({
          id: "profile.edit_profile.title",
          message: "Your Profile",
        })}
        showModal={showEditProfileModal}
        onToggleModal={() => setShowEditProfileModal((s) => !s)}
      >
        <EditProfile
          user={user}
          onSubmit={onEditProfile}
          isCarbonmarkUser={isCarbonmarkUser}
        />
      </Modal>

      {!!assetsData?.length && (
        <CreateListing
          onModalClose={() => setShowCreateListingModal(false)}
          onSubmit={onUpdateUser}
          assets={assetsData}
          showModal={showCreateListingModal}
        />
      )}
    </div>
  );
};
