import { ButtonPrimary, Spinner } from "@klimadao/lib/components";
import { t } from "@lingui/macro";
import { useConnectedMarketplaceUser } from "hooks/useConnectedMarketplaceUser";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import { User } from "@klimadao/lib/types/marketplace";
import { PageHead } from "components/PageHead";
import { MarketplaceLayout } from "../Layout";
import { SellerConnected } from "./SellerConnected";
import { SellerUnconnected } from "./SellerUnconnected";

type Props = {
  userAddress: string;
  userDomain: string | null;
  marketplaceUser: User | null;
};

export const Users: NextPage<Props> = (props) => {
  const { isConnectedUser, isUnconnectedUser } = useConnectedMarketplaceUser(
    props.userAddress
  );

  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const userName =
    props.userDomain || props.marketplaceUser?.handle || props.userAddress;

  // Wait until web3 is ready
  useEffect(() => {
    if (isConnectedUser || isUnconnectedUser) {
      setIsLoading(false);
    }
  }, [isConnectedUser, isUnconnectedUser]);

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
          isConnectedUser ? (
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

        {isConnectedUser && (
          <SellerConnected
            userAddress={props.userAddress}
            userName={userName}
            marketplaceUser={props.marketplaceUser}
            showEditProfileModal={showEditModal}
            onToggleEditProfileModal={() => setShowEditModal((prev) => !prev)}
          />
        )}

        {isUnconnectedUser && (
          <SellerUnconnected
            marketplaceUser={props.marketplaceUser}
            userName={userName}
          />
        )}
      </MarketplaceLayout>
    </>
  );
};
