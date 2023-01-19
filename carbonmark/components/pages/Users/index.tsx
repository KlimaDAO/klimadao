import { Spinner } from "@klimadao/lib/components";
import { useConnectedUser } from "hooks/useConnectedUser";
import { NextPage } from "next";
import { useEffect, useState } from "react";

import { User } from "@klimadao/lib/types/carbonmark";
import { Layout } from "components/Layout";
import { PageHead } from "components/shared/PageHead";
import { ProfileButton } from "./ProfileButton";
import { SellerConnected } from "./SellerConnected";
import { SellerUnconnected } from "./SellerUnconnected";

type Props = {
  userAddress: string;
  userDomain: string | null;
  carbonmarkUser: User | null;
};

export const Users: NextPage<Props> = (props) => {
  const { isConnectedUser, isUnconnectedUser } = useConnectedUser(
    props.userAddress
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const userName =
    props.userDomain || props.carbonmarkUser?.handle || props.userAddress;

  // Wait until web3 is ready
  useEffect(() => {
    if (isConnectedUser || isUnconnectedUser) {
      setIsLoading(false);
    }
  }, [isConnectedUser, isUnconnectedUser]);

  return (
    <>
      <PageHead
        title={`Carbonmark - Profile for ${userName}`}
        mediaTitle={`Carbonmark - Profile for ${userName}`}
        metaDescription={`Carbonmark - Profile for ${userName}`}
      />

      <Layout
        userAddress={props.userAddress}
        profileButton={
          isConnectedUser ? (
            <ProfileButton onClick={() => setShowEditModal(true)} />
          ) : undefined
        }
      >
        {isLoading && <Spinner />}

        {isConnectedUser && (
          <SellerConnected
            userAddress={props.userAddress}
            userName={userName}
            carbonmarkUser={props.carbonmarkUser}
            showEditProfileModal={showEditModal}
            onToggleEditProfileModal={() => setShowEditModal((prev) => !prev)}
          />
        )}

        {isUnconnectedUser && (
          <SellerUnconnected
            carbonmarkUser={props.carbonmarkUser}
            userName={userName}
          />
        )}
      </Layout>
    </>
  );
};
