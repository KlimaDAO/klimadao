import { GetUsersWalletorhandleQueryParams } from ".generated/carbonmark-api-sdk/types";
import { useWeb3 } from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { LoginCard } from "components/LoginCard";
import { PageHead } from "components/PageHead";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { Spinner } from "components/shared/Spinner";
import { useFetchUsersWalletOrHandle } from "hooks/useFetchUsersWalletOrHandle";
import { activityIsAdded, getUserUntil } from "lib/api";
import { notNil } from "lib/utils/functional.utils";
import { isNil } from "lodash";
import { first, get, pipe } from "lodash/fp";
import { NextPage } from "next";
import { useState } from "react";
import { mutate } from "swr";
import { CarbonmarkAssets } from "./CarbonmarkAssets";
import { PortfolioSidebar } from "./PortfolioSidebar";
import { UnregisteredMessage } from "./Retire/UnregisteredMessage";
import * as styles from "./styles";

export const Portfolio: NextPage = () => {
  const {
    isConnected,
    address = "",
    toggleModal,
    initializing,
    networkLabel,
  } = useWeb3();

  const params: GetUsersWalletorhandleQueryParams = {
    network: networkLabel,
    expiresAfter: "0",
  };

  const { data: carbonmarkUser, isLoading } = useFetchUsersWalletOrHandle(
    address,
    params,
    { shouldFetch: address !== "" && notNil(address) }
  );

  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const isConnectedUser = isConnected && address;
  const isCarbonmarkUser = isConnectedUser && !isLoading && !!carbonmarkUser;
  const isUnregistered = isConnectedUser && isNil(carbonmarkUser);
  const onUpdateUser = async () => {
    if (!carbonmarkUser) return;
    try {
      const newUser = await getUserUntil({
        address: carbonmarkUser.wallet.toLowerCase(),
        retryUntil: activityIsAdded(
          pipe(first, get("timeStamp"))(carbonmarkUser?.activities) || 0
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
              {isUnregistered && <UnregisteredMessage />}
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
