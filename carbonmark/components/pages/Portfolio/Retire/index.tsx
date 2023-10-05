import { useGetUsersWalletorhandle } from ".generated/carbonmark-api-sdk/hooks";
import { useWeb3 } from "@klimadao/lib/utils";
import { Messages } from "@lingui/core";
import { t, Trans } from "@lingui/macro";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { LoginCard } from "components/LoginCard";
import { PageHead } from "components/PageHead";
import { Text } from "components/Text";
import { createCompositeAsset } from "lib/actions";
import type {
  AssetForRetirement,
  PcbProject,
} from "lib/types/carbonmark.types";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RetireForm } from "./RetireForm";
import * as styles from "./styles";

export type RetirePageProps = {
  project: PcbProject;
  translation: Messages;
  fixedThemeName: string;
};

export const Retire: NextPage<RetirePageProps> = (props) => {
  const { isConnected, address, toggleModal, provider, initializing, networkLabel } =
    useWeb3();

  const { data: carbonmarkUser, isLoading } =
    useGetUsersWalletorhandle(
      address ?? "",
      { network: networkLabel },
    );


  const [retirementAsset, setRetirementAsset] =
    useState<AssetForRetirement | null>(null);
  const isConnectedUser = isConnected && address;

  const isCarbonmarkUser = isConnectedUser && !isLoading && !!carbonmarkUser;
  const isUnregistered =
    isConnectedUser && !isLoading && carbonmarkUser === null;

  const router = useRouter();

  useEffect(() => {
    if (!isConnected && !initializing && !isLoading) {
      router.push("/portfolio");
    }
  }, [isConnected, isLoading]);

  useEffect(() => {
    if (isConnected && !isLoading && carbonmarkUser) {
      function createRetirementAsset() {
        // unlikely, but this allows for duplicate projects
        const targetProject = Array.isArray(props.project)
          ? props.project[0]
          : undefined;

        if (targetProject && carbonmarkUser?.assets) {
          const asset = carbonmarkUser?.assets.filter((asset) => {
            return asset.token.id == targetProject.tokenAddress;
          })[0];

          if (!asset) {
            router.push("/portfolio");
            return;
          }
          const compositeAsset = createCompositeAsset({
            asset,
            project: targetProject,
          });

          setRetirementAsset(compositeAsset);
        }
      }
      createRetirementAsset();
    }
  }, [isConnected, isLoading, carbonmarkUser]);

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
          {!isConnectedUser && (
            <LoginCard isLoading={isLoading} onLogin={toggleModal} />
          )}
          {isCarbonmarkUser && retirementAsset && (
            <RetireForm
              address={address}
              asset={retirementAsset}
              provider={provider}
            />
          )}
          {isUnregistered && (
            <>
              <Text>
                <Trans>
                  Sorry. We could not find any data on Carbonmark for your user.
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
        </div>
      </Layout>
    </>
  );
};
