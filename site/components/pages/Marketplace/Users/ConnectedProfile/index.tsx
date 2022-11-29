import React, { FC, useState, useEffect } from "react";
import { t, Trans } from "@lingui/macro";

import { Text, ButtonSecondary, Spinner } from "@klimadao/lib/components";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "components/Modal";

import { EditProfile } from "./Edit";
import { AddListing } from "./AddListing";
import { Activities } from "../Activities";
import { Stats } from "../Stats";
import { ProfileHeader } from "../ProfileHeader";
import { Listing } from "../Listing";
import { getUser } from "../../lib/api";
import { pollUntil } from "../utils";

import {
  TwoColLayout,
  Col,
} from "components/pages/Marketplace/shared/TwoColLayout";

import { ethers } from "ethers";
import { formatUnits, getJsonRpcProvider } from "@klimadao/lib/utils";
import C3ProjectToken from "@klimadao/lib/abi/C3ProjectToken.json";
import { urls } from "@klimadao/lib/constants";
import { User, Asset } from "@klimadao/lib/types/marketplace";

import * as styles from "./styles";

type Props = {
  marketplaceUser: User | null;
  userName: string;
  userAddress: string;
  showEditModal: boolean;
  onToggleModal: () => void;
};

export const ConnectedProfile: FC<Props> = (props) => {
  const [user, setUser] = useState<User | null>(props.marketplaceUser);
  const [assetsData, setAssetsData] = useState<Asset[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showListingModal, setShowListingModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const hasListings = !!user?.listings?.length;
  const hasAssets = !!user?.assets?.length;

  // load Assets once
  useEffect(() => {
    if (!hasAssets) {
      setErrorMessage(
        t({
          id: "marketplace.profile.missing_assets",
          message: "You do not have any c3 tokens... :(",
        })
      );
    }

    if (hasAssets && !assetsData) {
      const getAssetsData = async () => {
        try {
          setIsLoading(true);
          const provider = getJsonRpcProvider(urls.polygonTestnetRpc);

          const assetsData = await user.assets.reduce<Promise<Asset[]>>(
            async (resultPromise, asset) => {
              const resolvedAssets = await resultPromise;
              const contract = new ethers.Contract(
                asset,
                C3ProjectToken.abi,
                provider
              );

              const tokenName = await contract.symbol();
              const c3TokenBalance = await contract.balanceOf(
                props.userAddress
              );
              const balance = formatUnits(c3TokenBalance);
              const projectInfo = await contract.getProjectInfo();

              resolvedAssets.push({
                tokenAddress: asset,
                tokenName,
                projectName: projectInfo.name,
                balance,
              });
              return resolvedAssets;
            },
            Promise.resolve([])
          );
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
          setIsLoading(false);
        }
      };
      getAssetsData();
    }
  }, [user, assetsData]);

  const onEditUser = (data: User) => {
    setUser((prev) => ({ ...prev, ...data }));
    props.onToggleModal();
  };

  const onAddListingSubmit = async () => {
    if (!user) return; // TS typeguard

    setShowListingModal(false);
    try {
      setIsLoading(true);

      const fetchUser = () =>
        getUser({
          user: props.userAddress,
          type: "wallet",
        });

      const validate = (newUser: User) => {
        const newListingsLength = newUser.listings.length;
        const currentListingsLength = user.listings.length;
        return newListingsLength > currentListingsLength;
      };

      const updatedUser = await pollUntil(fetchUser, validate, 1000);
      setUser((prev) => ({ ...prev, ...updatedUser }));
    } catch (e) {
      console.error("LOAD USER LISTING AGAIN error", e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className={styles.fullWidth}>
        <ProfileHeader
          userName={props.userName}
          isMarketplaceUser={!!user}
          description={
            user?.description ||
            t({ id: "marketplace.profile.edit_your_profile" })
          }
        />
      </div>

      <div className={styles.listings}>
        <div className={styles.listingsHeader}>
          <Text t="h3">
            <Trans>Listings</Trans>
          </Text>

          {errorMessage && (
            <Text className={styles.errorMessage}>{errorMessage}</Text>
          )}

          {!hasListings && (
            <Text t="caption" color="lighter">
              <i>
                <Trans id="marketplace.profile.listings.empty_state">
                  No listings to show.
                </Trans>
              </i>
            </Text>
          )}
        </div>

        <ButtonSecondary
          label={
            isLoading ? (
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
          disabled={isLoading || !hasAssets}
          onClick={() => setShowListingModal(true)}
          className={styles.createListingButton}
        />
      </div>

      <TwoColLayout>
        <Col>
          {hasListings &&
            user.listings.map((listing) => (
              <Listing key={listing.id} listing={listing} />
            ))}
        </Col>

        <Col>
          <Stats
            stats={{
              tonnesSold: 0,
              tonnesOwned: 0,
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
          />
        </Col>
      </TwoColLayout>

      <Modal
        title={t({
          id: "marketplace.profile.edit_modal.title",
          message: "Your Profile",
        })}
        showModal={props.showEditModal}
        onToggleModal={props.onToggleModal}
      >
        <EditProfile user={user} onSubmit={onEditUser} />
      </Modal>

      {!!assetsData?.length && (
        <Modal
          title={t({
            id: "marketplace.profile.listings_modal.title",
            message: "Add Listing",
          })}
          showModal={showListingModal}
          onToggleModal={() => setShowListingModal((prev) => !prev)}
        >
          <AddListing assets={assetsData} onSubmit={onAddListingSubmit} />
        </Modal>
      )}
    </>
  );
};
