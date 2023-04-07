import { concatAddress } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { Spinner } from "components/shared/Spinner";
import { useConnectedUser } from "hooks/useConnectedUser";
import { User } from "lib/types/carbonmark";
import { NextPage } from "next";
import { useEffect, useState } from "react";
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
        title={t`${
          props.carbonmarkUser?.handle || concatAddress(props.userAddress)
        } | Profile | Carbonmark`}
        mediaTitle={`${
          props.carbonmarkUser?.handle || concatAddress(props.userAddress)
        }'s Profile on Carbonmark`}
        metaDescription={t`Create and edit listings, and track your activity with your Carbonmark profile.`}
      />

      <Layout userAddress={props.userAddress}>
        {isLoading && <Spinner />}

        {isConnectedUser && (
          <SellerConnected
            userAddress={props.userAddress}
            userName={userName}
            carbonmarkUser={props.carbonmarkUser}
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
