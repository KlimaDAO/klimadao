import { useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { LoginCard } from "components/LoginCard";
import { PageHead } from "components/PageHead";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { useFetchUser } from "hooks/useFetchUser";
import { activityIsAdded, getUserUntil } from "lib/api";
import { NextPage } from "next";
import Link from "next/link";
import { useState } from "react";
import { CarbonmarkAssets } from "./CarbonmarkAssets";
import { PortfolioSidebar } from "./PortfolioSidebar";
import * as styles from "./styles";

export const Portfolio: NextPage = () => {
  const {
    isConnected,
    address = "",
    toggleModal,
    initializing,
    networkLabel,
  } = useWeb3();
  const { carbonmarkUser, isLoading, mutate } = useFetchUser({
    params: { walletOrHandle: address },
    //Since we're fetching for the current user fetch all listings
    query: { network: networkLabel, expiresAfter: "0" },
  }, { disabled: !address });

  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isConnectedUser = isConnected && address;
  const isCarbonmarkUser = isConnectedUser && !isLoading && !!carbonmarkUser;
  const isUnregistered =
    isConnectedUser && !isLoading && carbonmarkUser === null;

  const onUpdateUser = async () => {
    if (!carbonmarkUser) return;
    try {
      setIsPending(true);
      const newUser = await getUserUntil({
        address: carbonmarkUser.wallet.toLowerCase(),
        retryUntil: activityIsAdded(
          carbonmarkUser?.activities[0].timeStamp || "0"
        ),
        retryInterval: 2000,
        maxAttempts: 50,
        network: networkLabel,
      });
      await mutate(newUser, {
        optimisticData: newUser,
        revalidate: false,
        populateCache: true,
      });
    } catch (e) {
      console.error(e);
      setErrorMessage(
        t`Please refresh the page. There was an error updating your data: ${e}.`
      );
    } finally {
      setIsPending(false);
    }
  };

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
              {!isConnectedUser && !initializing && (
                <LoginCard isLoading={isLoading} onLogin={toggleModal} />
              )}
              {!isConnectedUser && initializing && (
                <div className={styles.spinnerContainer}>
                  <Spinner />
                </div>
              )}

              {errorMessage && (
                <Text t="h5" className={styles.errorMessage}>
                  {errorMessage}
                </Text>
              )}

              {isCarbonmarkUser && (
                <CarbonmarkAssets
                  address={address}
                  user={carbonmarkUser}
                  isLoadingUser={isLoading || isPending}
                  onUpdateUser={onUpdateUser}
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
              <PortfolioSidebar user={carbonmarkUser} isPending={isPending} />
            </Col>
          </TwoColLayout>
        </div>
      </Layout>
    </>
  );
};
