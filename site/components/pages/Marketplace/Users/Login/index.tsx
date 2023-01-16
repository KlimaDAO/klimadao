import { Spinner, Text } from "@klimadao/lib/components";
import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import LoginOutlinedIcon from "@mui/icons-material/LoginOutlined";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { PageHead } from "components/PageHead";
import { MarketplaceLayout } from "components/pages/Marketplace/Layout";
import { Card } from "components/pages/Marketplace/shared/Card";
import {
  Col,
  TwoColLayout,
} from "components/pages/Marketplace/shared/TwoColLayout";

import { Activities } from "components/pages/Marketplace/shared/Activities";
import { Stats } from "components/pages/Marketplace/shared/Stats";
import { useEffect, useState } from "react";
import * as styles from "./styles";

export const Login: NextPage = () => {
  const router = useRouter();
  const { address, isConnected, renderModal } = useWeb3();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isConnected) {
      setIsRedirecting(true);
      router.push(`/marketplace/users/${address}`);
    } else {
      setIsRedirecting(false);
    }
  }, [isConnected]);

  return (
    <>
      <PageHead
        title="KlimaDao - Marketplace User Login"
        mediaTitle="KlimaDao - Marketplace User Login"
        metaDescription="KlimaDao - Marketplace User Login"
      />

      <MarketplaceLayout>
        <TwoColLayout>
          <Col>
            <Card>
              <div className={styles.login}>
                <Text t="h3" className={styles.title}>
                  <LoginOutlinedIcon />
                  <Trans id="marketplace.user.login.title">
                    Please login or connect your wallet
                  </Trans>
                </Text>
                <Text t="caption">
                  <Trans id="marketplace.user.login.description">
                    This feature is available only to users who are logged in.
                    You can log in or create an account via the button below.
                  </Trans>
                </Text>
                {isRedirecting && (
                  <div className={styles.fullWidth}>
                    <Spinner />
                    <Text className={styles.redirecting}>
                      <Trans id="shared.loading" />
                    </Text>
                  </div>
                )}
                {!isRedirecting &&
                  renderModal({
                    errorMessage: t({
                      message:
                        "We had some trouble connecting. Please try again.",
                      id: "connect_modal.error_message",
                    }),
                    torusText: t({
                      message: "or continue with",
                      id: "connectModal.continue",
                    }),
                    titles: {
                      connect: t({
                        id: "connect_modal.sign_in",
                        message: "Sign In / Connect",
                      }),
                      loading: t({
                        id: "connect_modal.connecting",
                        message: "Connecting...",
                      }),
                      error: t({
                        id: "connect_modal.error_title",
                        message: "Connection Error",
                      }),
                    },
                  })}
              </div>
            </Card>
          </Col>
          <Col>
            <Activities activities={[]} />
            <Stats />
          </Col>
        </TwoColLayout>
      </MarketplaceLayout>
    </>
  );
};
