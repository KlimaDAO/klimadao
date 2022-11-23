import React, { FC, useState, useEffect } from "react";
import { t, Trans } from "@lingui/macro";

import { Text, ButtonSecondary, Spinner } from "@klimadao/lib/components";
import { Modal } from "components/Modal";

import { EditProfile } from "./Edit";
import { AddListing } from "./AddListing";
import { Activities } from "../Activities";
import { Stats } from "../Stats";
import { ProfileHeader } from "../ProfileHeader";

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
  const [assets, setAssets] = useState<Asset[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showListingModal, setShowListingModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // load Assets once
  useEffect(() => {
    if (!!user?.assets?.length && !assets) {
      const getAssets = async () => {
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
          setAssets(assetsData);
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
      getAssets();
    }
  }, [user, assets]);

  const onEditUser = (data: User) => {
    setUser((prev) => ({ ...prev, ...data }));
    props.onToggleModal();
  };

  const onAddListingSubmit = async () => {
    setShowListingModal(false);
    try {
      setIsLoading(true);
      console.log("LOAD USER AGAIN");
      setIsLoading(false);
    } catch (e) {
      console.error("LOAD USER AGAIN error", e);
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

      <div className={styles.main}>
        {errorMessage && <Text>{errorMessage}</Text>}
        Listings
      </div>

      <div className={styles.aside}>
        <ButtonSecondary
          label={
            isLoading ? (
              <Spinner />
            ) : (
              <Trans id="marketplace.profile.create_new_listing">
                Create New Listing
              </Trans>
            )
          }
          disabled={isLoading}
          onClick={() => setShowListingModal(true)}
          className={styles.createListingButton}
        />

        {!!assets?.length && (
          <Modal
            title={t({
              id: "marketplace.profile.listings_modal.title",
              message: "Add Listing",
            })}
            showModal={showListingModal}
            onToggleModal={() => setShowListingModal((prev) => !prev)}
          >
            <AddListing assets={assets} onSubmit={onAddListingSubmit} />
          </Modal>
        )}

        <Stats
          stats={{
            tonnesSold: 0,
            tonnesOwned: 0,
            activeListings: user?.listings.filter((l) => l.active).length || 0,
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
      </div>

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
    </>
  );
};
