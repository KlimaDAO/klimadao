import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { t } from "@lingui/macro";

import { useIsMarketplaceProfile } from "hooks/useIsMarketplaceProfile";
import { Text, ButtonPrimary, Spinner } from "@klimadao/lib/components";
import { Modal } from "components/Modal";

import { PageHead } from "components/PageHead";
import { MarketplaceLayout } from "../Layout";
import { EditProfile } from "./Edit";
import { User } from "@klimadao/lib/types/marketplace";

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
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const userName = props.userDomain || props.userAddress;
  const userData = user || props.marketplaceUser;

  useEffect(() => {
    if (isConnectedProfile || isUnconnectedProfile) {
      setIsLoading(false);
    }
    isConnectedProfile && setUser(props.marketplaceUser);
  }, [isConnectedProfile, isUnconnectedProfile]);

  const onSubmit = (values: User) => {
    console.log("VALUES", values);
    setShowModal(false);
    setUser(values);
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
              onClick={() => setShowModal(true)}
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
          showModal={showModal}
          onToggleModal={() => setShowModal((prev) => !prev)}
        >
          <EditProfile user={user} onSubmit={onSubmit} />
        </Modal>
      </MarketplaceLayout>
    </>
  );
};
