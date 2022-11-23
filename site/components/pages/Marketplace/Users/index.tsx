import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { t } from "@lingui/macro";
import { Text, ButtonPrimary, Spinner } from "@klimadao/lib/components";
import { useIsMarketplaceProfile } from "hooks/useIsMarketplaceProfile";

import { PageHead } from "components/PageHead";
import { MarketplaceLayout } from "../Layout";
import { ConnectedProfile } from "./ConnectedProfile";
import { UnconnectedProfile } from "./UnconnectedProfile";
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

  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const userName = props.userDomain || props.userAddress;

  // Wait until web3 is ready
  useEffect(() => {
    if (isConnectedProfile || isUnconnectedProfile) {
      setIsLoading(false);
    }
  }, [isConnectedProfile, isUnconnectedProfile]);

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

          {isConnectedProfile && (
            <ConnectedProfile
              userAddress={props.userAddress}
              userName={userName}
              marketplaceUser={props.marketplaceUser}
              showEditModal={showEditModal}
              onToggleModal={() => setShowEditModal((prev) => !prev)}
            />
          )}

          {isUnconnectedProfile && (
            <UnconnectedProfile marketplaceUser={props.marketplaceUser} />
          )}
        </div>
      </MarketplaceLayout>
    </>
  );
};
