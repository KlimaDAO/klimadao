import React, { FC, useState, useEffect } from "react";
import { t } from "@lingui/macro";

import { Text, ButtonPrimary, Spinner } from "@klimadao/lib/components";
import { Modal } from "components/Modal";

import { EditProfile } from "./Edit";
import { AddListing } from "./AddListing";
import { Activities } from "../Activities";
import { Stats } from "../Stats";

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
        {!user && <Text>Edit your profile</Text>}
        {user && (
          <>
            <Text>Handle: {user.handle}</Text>
            <Text>Username: {user.username}</Text>
            <Text>Description: {user.description}</Text>
            <Text>Wallet: {user.wallet}</Text>
            <Text>Listing: {user.listings?.length || 0}</Text>
            <Text>Activities: {user.activities?.length || 0}</Text>
          </>
        )}
      </div>

      <div className={styles.main}>
        Listings
        {isLoading && <Spinner />}
        {<Text>{errorMessage}</Text>}
      </div>

      <div className={styles.aside}>
        {!!assets?.length && (
          <>
            <ButtonPrimary
              label={t({
                id: "marketplace.add_listing",
                message: "Create Listing",
              })}
              onClick={() => setShowListingModal(true)}
            />
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
          </>
        )}
        <Stats
          stats={{
            tonnesSold: 0,
            tonnesOwned: 0,
            activeListings: user?.listings.filter((l) => l.active).length || 0,
          }}
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
