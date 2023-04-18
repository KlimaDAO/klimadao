import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { LoginCard } from "components/LoginCard";
import { PageHead } from "components/PageHead";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { useFetchUser } from "hooks/useFetchUser";
import { NextPage } from "next";
import Link from "next/link";
import { CarbonmarkAssets } from "./CarbonmarkAssets";
import { PortfolioSidebar } from "./PortfolioSidebar";
import * as styles from "./styles";

export const Portfolio: NextPage = () => {
  const { isConnected, address, toggleModal } = useWeb3();
  const { carbonmarkUser, isLoading } = useFetchUser(address);

  const isConnectedUser = isConnected && address;
  const isCarbonmarkUser = isConnectedUser && !isLoading && !!carbonmarkUser;
  const isUnregistered =
    isConnectedUser && !isLoading && carbonmarkUser === null;

  return (
    <>
      <PageHead
        title={t`Portfolio | Carbonmark`}
        mediaTitle={t`Portfolio | Carbonmark`}
        metaDescription={t`View a complete overview of the digital carbon that you own in your Portfolio. `}
      />

      <Layout>
        <div className={styles.container}>
          <div className={styles.portfolioControls}>
            <LoginButton />
          </div>
          <TwoColLayout>
            <Col>
              {!isConnectedUser && (
                <LoginCard isLoading={isLoading} onLogin={toggleModal} />
              )}

              {isCarbonmarkUser && (
                <CarbonmarkAssets
                  address={address}
                  user={carbonmarkUser}
                  isLoadingUser={isLoading}
                />
              )}

              {isUnregistered && (
                <>
                  <Text>
                    <Trans>
                      Sorry. We could not find any data on Carbonmark for your
                      user.
                    </Trans>
                  </Text>
                  <Text>
                    <Trans>
                      Have you already created your Carbonmark{" "}
                      <Link href={`/users/${address}`}>Profile</Link>?
                    </Trans>
                  </Text>
                </>
              )}
            </Col>

            <Col>
              <PortfolioSidebar user={carbonmarkUser} />
            </Col>
          </TwoColLayout>
        </div>
      </Layout>
    </>
  );
};
