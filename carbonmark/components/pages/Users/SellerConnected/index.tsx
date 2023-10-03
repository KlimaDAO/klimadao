import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { CreateListing } from "components/CreateListing";
import { LoginButton } from "components/LoginButton";
import { Modal } from "components/shared/Modal";
import { SpinnerWithLabel } from "components/SpinnerWithLabel";
import { Text } from "components/Text";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { useFetchUser } from "hooks/useFetchUser";
import { addProjectsToAssets } from "lib/actions";
import { activityIsAdded, getUser, getUserUntil } from "lib/api";
import { getAssetsWithProjectTokens } from "lib/getAssetsData";
import { getActiveListings, getSortByUpdateListings } from "lib/listingsGetter";
import { AssetForListing, User } from "lib/types/carbonmark.types";
import { notNil } from "lib/utils/functional.utils";
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
  const { address } = useWeb3();
  const { carbonmarkUser, isLoading, mutate } = useFetchUser({
    params: { walletOrHandle: props.userAddress },
    // Conditionally fetch all listings for the user if viewing own profile
    query: { expiresAfter: address === props.userAddress ? "0" : undefined },
  });

  const [isPending, setIsPending] = useState(false);

  const [assetsData, setAssetsData] = useState<AssetForListing[] | null>(null);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [_isLoadingAssets, setIsLoadingAssets] = useState(false);

  const [showCreateListingModal, setShowCreateListingModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hasAssets = !!carbonmarkUser?.assets?.length;
  const activeListings = getActiveListings(carbonmarkUser?.listings ?? []);
  const sortedListings = getSortByUpdateListings(activeListings);
  const hasListings = !!activeListings.length;

  const isCarbonmarkUser = !isLoading && !!carbonmarkUser;
  const isRegistered = notNil(carbonmarkUser);

  const scrollToTop = () =>
    scrollToRef.current &&
    scrollToRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  const handleMutateUserUntil = async () => {
    const latestActivity = carbonmarkUser?.activities.sort(
      (a, b) => Number(b.timeStamp) - Number(a.timeStamp)
    )[0];

    const newUser = await getUserUntil({
      address: props.userAddress,
      retryUntil: activityIsAdded(latestActivity?.timeStamp || "0"),
      retryInterval: 1000,
      maxAttempts: 50,
    });

    return newUser;
  };

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
    try {
      scrollToTop();
      setIsPending(true);
      await mutate(handleMutateUserUntil, {
        populateCache: true,
      });
    } catch (e) {
      console.error(e);
      setErrorMessage(
        t`Please refresh the page. There was an error updating your data: ${e}.`
      );
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div ref={scrollToRef} className={styles.container}>
      <div className={styles.userControlsRow}>
        <ProfileButton
          label={isRegistered ? t`Edit Profile` : t`Create Profile`}
          onClick={() => setShowEditProfileModal(true)}
        />
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

          {errorMessage && (
            <Text t="h5" className={styles.errorMessage}>
              {errorMessage}
            </Text>
          )}
        </div>
        {isCarbonmarkUser && (
          <TextInfoTooltip tooltip="New listings are temporarily disabled while we upgrade our marketplace to a new version.">
            <div>
              <CarbonmarkButton
                label={
                  <>
                    <span className={styles.addListingButtonText}>
                      <Trans>Create New Listing</Trans>
                    </span>
                    <span className={styles.addListingButtonIcon}>
                      <AddIcon />
                    </span>
                  </>
                }
                disabled={true} // disabled until carbonmark V2
                onClick={() => {
                  // setShowCreateListingModal(true)
                }}
              />
            </div>
          </TextInfoTooltip>
        )}
      </div>

      <TwoColLayout>
        <Col>
          {isPending && (
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
              isUpdatingData={isPending}
            />
          )}
        </Col>

        <Col>
          <ProfileSidebar
            user={carbonmarkUser}
            isPending={isPending}
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
