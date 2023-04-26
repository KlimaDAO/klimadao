import { concatAddress } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Layout } from "components/Layout";
import { PageHead } from "components/PageHead";
import { Spinner } from "components/shared/Spinner";
import { useConnectedUser } from "hooks/useConnectedUser";
import { useFetchUser } from "hooks/useFetchUser";
import { fetcher } from "lib/fetcher";
import { User } from "lib/types/carbonmark";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { SWRConfig } from "swr";
import { SellerConnected } from "./SellerConnected";
import { SellerUnconnected } from "./SellerUnconnected";

export type PageProps = {
  userAddress: string;
  userDomain: string | null;
  carbonmarkUser: User | null;
};

const Page: NextPage<PageProps> = (props) => {
  const { carbonmarkUser } = useFetchUser(props.userAddress);

  const { isConnectedUser, isUnconnectedUser } = useConnectedUser(
    props.userAddress
  );
  const [isLoading, setIsLoading] = useState(false);

  const userName =
    props.userDomain || carbonmarkUser?.handle || props.userAddress;

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
          carbonmarkUser?.handle || concatAddress(props.userAddress)
        } | Profile | Carbonmark`}
        mediaTitle={`${
          carbonmarkUser?.handle || concatAddress(props.userAddress)
        }'s Profile on Carbonmark`}
        metaDescription={t`Create and edit listings, and track your activity with your Carbonmark profile.`}
      />

      <Layout userAddress={props.userAddress}>
        {isLoading && <Spinner />}

        {isConnectedUser && (
          <SellerConnected
            userAddress={props.userAddress}
            userName={userName}
            carbonmarkUser={carbonmarkUser}
          />
        )}

        {isUnconnectedUser && (
          <SellerUnconnected
            userAddress={props.userAddress}
            userName={userName}
          />
        )}
      </Layout>
    </>
  );
};

export const Users: NextPage<PageProps> = (props) => (
  <SWRConfig
    value={{
      fetcher,
      fallback: {
        [`/api/users/${props.userAddress}?type=wallet`]: props.carbonmarkUser,
      },
    }}
  >
    <Page {...props} />
  </SWRConfig>
);
