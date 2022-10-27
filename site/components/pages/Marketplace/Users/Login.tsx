import { NextPage } from "next";
import { useRouter } from "next/router";
import { Text, ButtonPrimary, Spinner } from "@klimadao/lib/components";
import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";

import { PageHead } from "components/PageHead";
import { MarketplaceLayout } from "../Layout";

import * as styles from "./styles";
import { useEffect, useState } from "react";

export const Login: NextPage = () => {
  const router = useRouter();
  const { address, isConnected, connect } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);

  const onConnect = () => {
    setIsLoading(true);
    !!connect && connect();
  };

  useEffect(() => {
    isConnected && router.push(`/marketplace/users/${address}`);
  }, [isConnected]);

  return (
    <>
      <PageHead
        title="KlimaDao - Marketplace User Login"
        mediaTitle="KlimaDao - Marketplace User Login"
        metaDescription="KlimaDao - Marketplace User Login"
      />

      <MarketplaceLayout>
        {!isLoading && (
          <div className={styles.fullWidth}>
            <Text>Please login or connect your wallet</Text>
            <ButtonPrimary
              label={t({
                id: "shared.login_connect",
                message: "Login / Connect",
              })}
              onClick={onConnect}
            />
          </div>
        )}

        {isLoading && (
          <div className={styles.fullWidth}>
            <Spinner />
          </div>
        )}
      </MarketplaceLayout>
    </>
  );
};
