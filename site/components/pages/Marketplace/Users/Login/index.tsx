import { NextPage } from "next";
import { useRouter } from "next/router";
import { Text, ButtonPrimary, Spinner } from "@klimadao/lib/components";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";

import { PageHead } from "components/PageHead";
import { MarketplaceLayout } from "../../Layout";

import * as styles from "./styles";
import { useEffect, useState } from "react";
import { Activities } from "../Activities";
import { Stats } from "../Stats";

export const Login: NextPage = () => {
  const router = useRouter();
  const { address, isConnected, connect } = useWeb3();
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const onConnect = async () => {
    setIsLoading(true);
    !!connect && (await connect());
    setIsRedirecting(true);
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
        <div className={styles.main}>
          <div className={styles.card}>
            <div className={styles.login}>
              <Text t="h3" className={styles.title}>
                <LoginOutlinedIcon />
                <Trans id="marketplace.user.login.title">
                  Please login or connect your wallet
                </Trans>
              </Text>
              <Text t="caption">
                <Trans id="marketplace.user.login.description">
                  This feature is available only to users who are logged in. You
                  can log in or create an account via the button below.
                </Trans>
              </Text>
              {isLoading && (
                <div className={styles.fullWidth}>
                  <Spinner />
                  <Text className={styles.redirecting}>
                    {isRedirecting ? (
                      <Trans id="shared.loading" />
                    ) : (
                      <Trans id="shared.connecting">Connecting...</Trans>
                    )}
                  </Text>
                </div>
              )}
              {!isLoading && !isRedirecting && (
                <ButtonPrimary
                  label={t({
                    id: "shared.login_connect",
                    message: "Login / Connect",
                  })}
                  className={styles.loginButton}
                  onClick={onConnect}
                />
              )}
            </div>
          </div>
        </div>
        <div className={styles.aside}>
          <Activities activities={[]} />
          <Stats />
        </div>
      </MarketplaceLayout>
    </>
  );
};
