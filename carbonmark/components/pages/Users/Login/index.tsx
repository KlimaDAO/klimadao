import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { NextPage } from "next";
import { useRouter } from "next/router";

import { Layout } from "components/Layout";
import { LoginCard } from "components/LoginCard";
import { PageHead } from "components/PageHead";
import { Col, TwoColLayout } from "components/TwoColLayout";

import { Activities } from "components/Activities";
import { Stats } from "components/Stats";
import { useEffect, useState } from "react";

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
        <TwoColLayout>
          <Col>
            <LoginCard isLoading={isRedirecting} onLogin={toggleModal} />
          </Col>
          <Col>
            <Activities activities={[]} />
            <Stats description={t`Data for this seller`} />
          </Col>
        </TwoColLayout>
      </Layout>
    </>
  );
};
