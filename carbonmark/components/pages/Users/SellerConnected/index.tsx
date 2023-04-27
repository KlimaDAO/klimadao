import { t, Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { CreateListing } from "components/CreateListing";
import { LoginButton } from "components/LoginButton";
import { Modal } from "components/shared/Modal";
import { Spinner } from "components/shared/Spinner";
import { SpinnerWithLabel } from "components/SpinnerWithLabel";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { useFetchUser } from "hooks/useFetchUser";
import { addProjectsToAssets } from "lib/actions";
import { getUser } from "lib/api";
import { getAssetsWithProjectTokens } from "lib/getAssetsData";
import { getActiveListings, getSortByUpdateListings } from "lib/listingsGetter";
import { pollUntil } from "lib/pollUntil";
import { AssetForListing, User } from "lib/types/carbonmark";
import { FC, useEffect, useRef, useState } from "react";
import { ProfileButton } from "../ProfileButton";
import { ProfileHeader } from "../ProfileHeader";
import { ProfileSidebar } from "../ProfileSidebar";
import { EditProfile } from "./Forms/EditProfile";
import { ListingEditable } from "./ListingEditable";
import * as styles from "./styles";

type Props = {
  userName: string;
  userAddress: string;
};

export const SellerConnected: FC<Props> = (props) => {
  const scrollToRef = useRef<null | HTMLDivElement>(null);
  const { carbonmarkUser, isLoading, mutate } = useFetchUser(props.userAddress);
  const [assetsData, setAssetsData] = useState<AssetForListing[] | null>(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [isLoadingAssets, setIsLoadingAssets] = useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = useState(false);
  const [showCreateListingModal, setShowCreateListingModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hasAssets = !!carbonmarkUser?.assets?.length;
  const activeListings = getActiveListings(carbonmarkUser?.listings ?? []);
  const sortedListings = getSortByUpdateListings(activeListings);
  const hasListings = !!activeListings.length;

  const isCarbonmarkUser = !isLoading && !!carbonmarkUser;
  const isUnregistered = !isLoading && carbonmarkUser === null;

  const scrollToTop = () =>
    scrollToRef.current &&
    scrollToRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

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
            carbonmarkUser.assets
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
  }, [carbonmarkUser]);

  const onEditProfile = async (profileData: User) => {
    try {
      // get fresh data again
      const userFromApi = await getUser({
        user: props.userAddress,
        type: "wallet",
      });

      // Merge with data from Updated Profile as backend might be slow!
      const newUser = { ...userFromApi, ...profileData };

      // Update the cache only, do not revalidate
      await mutate(newUser, false);
      setShowEditProfileModal(false);
    } catch (e) {
      console.error(e);
      t`Please refresh the page. There was an error updating your data: ${e}.`;
    }
  };

  const onUpdateUser = async () => {
    if (!carbonmarkUser) return; // TS typeguard

    try {
      scrollToTop();
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
        const currentActivityLength = carbonmarkUser?.activities?.length || 0;
        return newActivityLength > currentActivityLength;
      };

      const updatedUser = await pollUntil({
        fn: fetchUser,
        validate: activityIsAdded,
        ms: 1000,
        maxAttempts: 50,
      });
      console.log("UPDATE USER", updatedUser);
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
    <div ref={scrollToRef} className={styles.container}>
      <div className={styles.userControlsRow}>
        <ProfileButton
          label={isUnregistered ? t`Create Profile` : t`Edit Profile`}
          onClick={() => setShowEditProfileModal(true)}
        />
        <LoginButton className="loginButton" />
      </div>
      <div className={styles.fullWidth}>
        <ProfileHeader
          carbonmarkUser={carbonmarkUser}
          userName={props.userName}
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
        {isCarbonmarkUser && (
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
        )}
      </div>

      <TwoColLayout>
        <Col>
          {isUpdatingUser && (
            <Card>
              <SpinnerWithLabel label={t`Updating your data...`} />
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
          <ProfileSidebar
            user={carbonmarkUser}
            isPending={isUpdatingUser}
            title={t`Your seller data`}
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
          user={carbonmarkUser}
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
