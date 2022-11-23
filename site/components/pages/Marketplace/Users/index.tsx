import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { t } from "@lingui/macro";
import { ButtonPrimary, Spinner } from "@klimadao/lib/components";
import { useIsMarketplaceProfile } from "hooks/useIsMarketplaceProfile";

import { PageHead } from "components/PageHead";
import { MarketplaceLayout } from "../Layout";
import { ConnectedProfile } from "./ConnectedProfile";
import { UnconnectedProfile } from "./UnconnectedProfile";
import { User } from "@klimadao/lib/types/marketplace";

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

  const userName =
    props.userDomain || props.marketplaceUser?.handle || props.userAddress;

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
                id: "marketplace.button.edit_profile",
                message: "Edit Profile",
              })}
              onClick={() => setShowEditModal(true)}
            />
          ) : undefined
        }
      >
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
          <UnconnectedProfile
            marketplaceUser={props.marketplaceUser}
            userName={userName}
          />
        )}
      </MarketplaceLayout>
    </>
  );
};
