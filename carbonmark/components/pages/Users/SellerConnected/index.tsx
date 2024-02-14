import { getUsersWalletorhandle } from ".generated/carbonmark-api-sdk/clients";
import { useGetUsersWalletorhandle } from ".generated/carbonmark-api-sdk/hooks";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import AddIcon from "@mui/icons-material/Add";
import { CarbonmarkButton } from "components/CarbonmarkButton";
import { Card } from "components/Card";
import { CreateListing } from "components/CreateListing";
import { Modal } from "components/shared/Modal";
import { SpinnerWithLabel } from "components/SpinnerWithLabel";
import { Text } from "components/Text";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { activityIsAdded, getUserUntil } from "lib/api";
import { getFeatureFlag } from "lib/getFeatureFlag";
import { getActiveListings, getSortByUpdateListings } from "lib/listingsGetter";
import { notNil } from "lib/utils/functional.utils";
import { hasListableAssets } from "lib/utils/listings.utils";
import { first, get, pipe } from "lodash/fp";
import { FC, useRef, useState } from "react";
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
  const { address, networkLabel: network } = useWeb3();
  const {
    data: carbonmarkUser,
    isLoading,
    mutate,
  } = useGetUsersWalletorhandle(
    props.userAddress,
    {
      network,
      expiresAfter: address === props.userAddress ? "0" : undefined,
    },
    { shouldFetch: notNil(props.userAddress) }
  );
  const [isPending, setIsPending] = useState(false);
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showCreateListingModal, setShowCreateListingModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const activeListings = getActiveListings(carbonmarkUser?.listings ?? []);
  const sortedListings = getSortByUpdateListings(activeListings);
  const hasListings = !!activeListings.length;

  const isCarbonmarkUser = !isLoading && !!carbonmarkUser;
  const isRegistered = notNil(carbonmarkUser);

  const scrollToTop = () =>
    scrollToRef.current &&
    scrollToRef.current.scrollIntoView({ behavior: "smooth", block: "start" });

  const onEditProfile = async (handle: string) => {
    try {
      const newProfile = await getUsersWalletorhandle(handle.toLowerCase());
      // Update the cache only, do not revalidate
      await mutate(newProfile, false);
      setShowEditProfileModal(false);
    } catch (e) {
      console.error(e);
      t`Please refresh the page. There was an error updating your data: ${e}.`;
    }
  };

  const onUpdateUser = async () => {
    try {
      if (!carbonmarkUser) return;
      scrollToTop();
      setIsPending(true);
      const newUser = await getUserUntil({
        address: carbonmarkUser.wallet.toLowerCase(),
        retryUntil: activityIsAdded(
          pipe(first, get("timeStamp"))(carbonmarkUser?.activities) || 0
        ),
        retryInterval: 2000,
        maxAttempts: 50,
        network,
      });
      await mutate(newUser, {
        optimisticData: newUser,
        revalidate: false, // mutate() triggers request-- we can skip it
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
      <div className={styles.fullWidth}>
        <div className={styles.userControlsRow} data-mobile-only>
          <ProfileButton
            label={isRegistered ? t`Edit Profile` : t`Create Profile`}
            onClick={() => setShowEditProfileModal(true)}
          />
        </div>
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
        <div className={styles.userControlsRow}>
          <div data-desktop-only>
            <ProfileButton
              label={isRegistered ? t`Edit Profile` : t`Create Profile`}
              onClick={() => setShowEditProfileModal(true)}
            />
          </div>
          {isCarbonmarkUser &&
            (getFeatureFlag("createListing") ? (
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
                onClick={() => {
                  setShowCreateListingModal(true);
                }}
                disabled={
                  !hasListableAssets(
                    carbonmarkUser.assets || [],
                    carbonmarkUser.listings || []
                  )
                }
              />
            ) : (
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
                  />
                </div>
              </TextInfoTooltip>
            ))}
        </div>
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
              assets={carbonmarkUser?.assets || []}
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
      {!!carbonmarkUser?.assets?.length && (
        <CreateListing
          onModalClose={() => setShowCreateListingModal(false)}
          onSubmit={onUpdateUser}
          assets={carbonmarkUser.assets}
          listings={carbonmarkUser.listings || []}
          showModal={showCreateListingModal}
        />
      )}
    </div>
  );
};
