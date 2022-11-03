import React, { useState } from "react";
import { NextPage } from "next";
import { t } from "@lingui/macro";

import { useIsMarketplaceProfile } from "hooks/useIsMarketplaceProfile";
import { Text, ButtonPrimary } from "@klimadao/lib/components";
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
  const [user, setUser] = useState(props.marketplaceUser);
  const [showModal, setShowModal] = useState(false);

  const userName = props.userDomain || props.userAddress;

  const onSubmit = (values: User) => {
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
          {!props.marketplaceUser && isUnconnectedProfile && (
            <Text>
              Sorry, we couldn't find any marketplace data for this user.
            </Text>
          )}
          {!props.marketplaceUser && isConnectedProfile && (
            <Text>Edit your profile</Text>
          )}
          {props.marketplaceUser && (
            <>
              <Text>Handle: {props.marketplaceUser.handle}</Text>
              <Text>Username: {props.marketplaceUser.username}</Text>
              <Text>Description: {props.marketplaceUser.description}</Text>
              <Text>Wallet: {props.marketplaceUser.wallet}</Text>
              <Text>Listing: {props.marketplaceUser.listings.length}</Text>
              <Text>Activities: {props.marketplaceUser.activities.length}</Text>
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
