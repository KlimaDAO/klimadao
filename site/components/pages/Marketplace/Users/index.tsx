import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { t } from "@lingui/macro";

import { useIsMarketplaceProfile } from "hooks/useIsMarketplaceProfile";
import { Text, ButtonPrimary, Spinner } from "@klimadao/lib/components";
import { Modal } from "components/Modal";

import { PageHead } from "components/PageHead";
import { MarketplaceLayout } from "../Layout";
import { EditProfile } from "./Edit";
import { AddListing } from "./AddListing";
import { User, Asset } from "@klimadao/lib/types/marketplace";

import { ethers } from "ethers";
import { formatUnits } from "@klimadao/lib/utils";
import C3ProjectToken from "@klimadao/lib/abi/C3ProjectToken.json";
import { urls } from "@klimadao/lib/constants";
import { getJsonRpcProvider } from "@klimadao/lib/utils";

import * as styles from "./styles";

type Props = {
  userAddress: string;
  userDomain: string | null;
  marketplaceUser: User | null;
};

export const Users: NextPage<Props> = (props) => {
  const { isConnectedProfile, isUnconnectedProfile } = useIsMarketplaceProfile(
    props.userAddress
  );
  const [user, setUser] = useState<User | null>(null);
  const [assets, setAssets] = useState<Asset[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showListingModal, setShowListingModal] = useState(false);

  const userName = props.userDomain || props.userAddress;
  const userData = user || props.marketplaceUser;

  useEffect(() => {
    if (isConnectedProfile || isUnconnectedProfile) {
      setIsLoading(false);
    }
    isConnectedProfile && setUser(props.marketplaceUser);
  }, [isConnectedProfile, isUnconnectedProfile]);

  // load Listings on Mount, will be in API data later !
  // hard coded for one specific C3token for now
  useEffect(() => {
    if (isConnectedProfile && !!userData) {
      const getAssets = async () => {
        const provider = getJsonRpcProvider(urls.polygonTestnetRpc);

        const contract = new ethers.Contract(
          "0xa1c1cCD8C61FeC141AAed6B279Fa4400b68101d4",
          C3ProjectToken.abi,
          provider
        );

        const c3TokenBalance = await contract.balanceOf(props.userAddress);
        const balance = formatUnits(c3TokenBalance);
        const projectInfo = await contract.getProjectInfo();

        setAssets((prev) => [
          ...prev,
          {
            tokenAddress: "0xa1c1cCD8C61FeC141AAed6B279Fa4400b68101d4",
            tokenName: "C3T-GS-500",
            projectName: projectInfo.name,
            balance,
          },
          {
            tokenAddress: "some-string",
            tokenName: "A token name",
            projectName: "projectInfo.name",
            balance: "20",
          },
        ]);
      };
      getAssets();
    }
  }, [isConnectedProfile, userData]);

  const onEditSubmit = (values: User) => {
    setShowEditModal(false);
    setUser(values);
  };

  const onAddListingSubmit = () => {
    setShowListingModal(false);
    console.log("LOAD USER AGAIN");
  };

  return (
    <>
      <PageHead
        title={`KlimaDao - Marketplace Profile for ${userName}`}
        mediaTitle={`KlimaDao - Marketplace Profile for ${userName}`}
        metaDescription={`KlimaDao - Marketplace Profile for ${userName}`}
      />

      <MarketplaceLayout
        userAddress={props.userAddress}
        userDomain={props.userDomain}
        profileButton={
          isConnectedProfile ? (
            <ButtonPrimary
              label={t({
                id: "marketplace.edit_profile",
                message: "Edit Profile",
              })}
              onClick={() => setShowEditModal(true)}
            />
          ) : undefined
        }
      >
        <div className={styles.fullWidth}>
          <Text t="h1">User</Text>
          <Text>User: {userName}</Text>
          {isLoading && <Spinner />}

          {!userData && isUnconnectedProfile && (
            <Text>
              Sorry, we couldn't find any marketplace data for this user.
            </Text>
          )}
          {!userData && isConnectedProfile && <Text>Edit your profile</Text>}
          {userData && (
            <>
              <Text>Handle: {userData.handle}</Text>
              <Text>Username: {userData.username}</Text>
              <Text>Description: {userData.description}</Text>
              <Text>Wallet: {userData.wallet}</Text>
              <Text>Listing: {userData.listings?.length || 0}</Text>
              <Text>Activities: {userData.activities?.length || 0}</Text>
            </>
          )}
        </div>

        <Modal
          title={t({
            id: "marketplace.profile.edit_modal.title",
            message: "Your Profile",
          })}
          showModal={showEditModal}
          onToggleModal={() => setShowEditModal((prev) => !prev)}
        >
          <EditProfile user={user} onSubmit={onEditSubmit} />
        </Modal>

        {!!assets.length && (
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
      </MarketplaceLayout>
    </>
  );
};
