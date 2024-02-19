import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Activities } from "components/Activities";
import { Layout } from "components/Layout";
import { LoginCard } from "components/LoginCard";
import { PageHead } from "components/PageHead";
import { Stats } from "components/Stats";
import { Col } from "components/TwoColLayout";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import * as styles from "./styles";

export const Login: NextPage = () => {
  const router = useRouter();
  const { address, isConnected, toggleModal } = useWeb3();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (isConnected) {
      setIsRedirecting(true);
      router.push(`/users/${address}`);
    } else {
      setIsRedirecting(false);
    }
  }, [isConnected]);

  return (
    <>
      <PageHead
        title={t`User Profile | Carbonmark`}
        mediaTitle={t`User Profile | Carbonmark`}
        metaDescription={t`Log in to create a Carbonmark profile`}
      />

      <Layout>
        <div className={styles.loginContent}>
          <Col>
            <LoginCard isLoading={isRedirecting} onLogin={toggleModal} />
          </Col>
          <Col>
            <Activities activities={[]} />
            <Stats description={t`Data for this seller`} />
          </Col>
        </div>
      </Layout>
    </>
  );
};
