import { useWeb3 } from "@klimadao/lib/utils";
import { Messages } from "@lingui/core";
import { t, Trans } from "@lingui/macro";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { LoginCard } from "components/LoginCard";
import { PageHead } from "components/PageHead";
import { Text } from "components/Text";
import { Col, TwoColLayout } from "components/TwoColLayout";
import { useFetchUser } from "hooks/useFetchUser";
import { addProjectsToAssets } from "lib/actions";
import { activityIsAdded, getUserUntil } from "lib/api";
import type { AssetForRetirement, Project } from "lib/types/carbonmark";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RetireForm } from "./RetireForm";
import { RetirementSidebar } from "./RetirementSidebar";
import * as styles from "./styles";

export type RetirePageProps = {
  project: Project;
  translation: Messages;
  fixedThemeName: string;
};

export const Retire: NextPage<RetirePageProps> = (props) => {
  const { isConnected, address, toggleModal, provider } = useWeb3();
  const { carbonmarkUser, isLoading, mutate } = useFetchUser(address);
  const [isPending, setIsPending] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [loadingTriggered, setLoadingTriggered] = useState(false);
  const [retirementAsset, setRetirementAsset] =
    useState<AssetForRetirement | null>(null);

  const isConnectedUser = isConnected && address;

  const isCarbonmarkUser = isConnectedUser && !isLoading && !!carbonmarkUser;
  const isUnregistered =
    isConnectedUser && !isLoading && carbonmarkUser === null;

  const router = useRouter();

  useEffect(() => {
    if (isLoading) {
      setLoadingTriggered(true);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!isConnected && !isLoading && loadingTriggered) {
      console.log("redirecting to portfolio");
      router.push("/portfolio");
    }
  }, [isConnected, isLoading, loadingTriggered]);

  useEffect(() => {
    if (isConnected && !isLoading && loadingTriggered && carbonmarkUser) {
      async function createRetirementAsset() {
        // unlikely, but this allows for duplicate projects
        const targetProject = Array.isArray(props.project)
          ? props.project[0]
          : undefined;

        if (targetProject && carbonmarkUser?.assets) {
          const asset = carbonmarkUser?.assets.filter((asset) => {
            return asset.token.id == targetProject.projectAddress;
          })[0];

          const retireProjectAsset = await addProjectsToAssets({
            assets: [asset],
          });
          let compositeAsset: AssetForRetirement;
          if (retireProjectAsset && retireProjectAsset.length > 0) {
            // Assuming that assetForListing is available in this scope
            compositeAsset = {
              ...retireProjectAsset[0],
              tokenSymbol: asset.token.symbol,
            };
            setRetirementAsset(compositeAsset);
          }
        }
      }
      createRetirementAsset();
    }
  }, [isConnected, isLoading, loadingTriggered, carbonmarkUser]);

  const handleMutateUser = async () => {
    if (!isConnectedUser) return;

    const latestActivity = carbonmarkUser?.activities.sort(
      (a, b) => Number(b.timeStamp) - Number(a.timeStamp)
    )[0];

    const newUser = await getUserUntil({
      address,
      retryUntil: activityIsAdded(latestActivity?.timeStamp || "0"),
      retryInterval: 1000,
      maxAttempts: 50,
    });

    return newUser;
  };

  const onUpdateUser = async () => {
    try {
      setIsPending(true);
      await mutate(handleMutateUser, {
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
        title={t`Retire | Carbonmark`}
        mediaTitle={t`Retire | Carbonmark`}
        metaDescription={t`View a complete overview of the digital carbon that you own in your Retire. `}
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
              {errorMessage && (
                <Text t="h5" className={styles.errorMessage}>
                  {errorMessage}
                </Text>
              )}
              {isCarbonmarkUser && retirementAsset && (
                <RetireForm
                  address={address}
                  asset={retirementAsset}
                  isConnected={isConnected}
                  onUpdateUser={onUpdateUser}
                  provider={provider}
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
            {retirementAsset && (
              <Col>
                <RetirementSidebar retirementAsset={retirementAsset} />
              </Col>
            )}
          </TwoColLayout>
        </div>
      </Layout>
    </>
  );
};
