import { useGetUsersWalletorhandle } from ".generated/carbonmark-api-sdk/hooks";
import { useWeb3 } from "@klimadao/lib/utils";
import { Messages } from "@lingui/core";
import { t } from "@lingui/macro";
import { Layout } from "components/Layout";
import { LoginCard } from "components/LoginCard";
import { PageHead } from "components/PageHead";
import { createCompositeAsset } from "lib/actions";
import type {
  AssetForRetirement,
  DigitalCarbonCredit,
} from "lib/types/carbonmark.types";
import { notNil } from "lib/utils/functional.utils";
import { isNil } from "lodash";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RetireForm } from "./RetireForm";
import { UnregisteredMessage } from "./UnregisteredMessage";
import * as styles from "./styles";

export type RetirePageProps = {
  project: DigitalCarbonCredit;
  translation: Messages;
  fixedThemeName: string;
};

export const Retire: NextPage<RetirePageProps> = (props) => {
  const {
    isConnected,
    address = "",
    toggleModal,
    provider,
    initializing,
    networkLabel,
  } = useWeb3();

  const { data: carbonmarkUser, isLoading } = useGetUsersWalletorhandle(
    address ?? "",
    { network: networkLabel, expiresAfter: "0" },
    { shouldFetch: notNil(address) }
  );

  const [retirementAsset, setRetirementAsset] =
    useState<AssetForRetirement | null>(null);
  const isConnectedUser = isConnected && address;

  const isCarbonmarkUser = isConnectedUser && !isLoading && !!carbonmarkUser;
  const isUnregistered = isConnectedUser && isNil(carbonmarkUser);

  const router = useRouter();

  useEffect(() => {
    if (!isConnected && !initializing && !isLoading) {
      router.push("/portfolio");
    }
  }, [isConnected, isLoading]);

  useEffect(() => {
    if (isConnected && !isLoading && carbonmarkUser) {
      function createRetirementAsset() {
        const targetCredit = props.project;

        if (targetCredit && carbonmarkUser?.assets) {
          const asset = carbonmarkUser?.assets.filter((asset) => {
            return asset.token.id == targetCredit.tokenAddress;
          })[0];

          if (!asset) {
            router.push("/portfolio");
            return;
          }
          const compositeAsset = createCompositeAsset({
            asset,
            credit: targetCredit,
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
          {!isConnectedUser && (
            <LoginCard isLoading={isLoading} onLogin={toggleModal} />
          )}
          {isCarbonmarkUser && retirementAsset && (
            <RetireForm
              user={carbonmarkUser}
              address={address}
              asset={retirementAsset}
              provider={provider}
            />
          )}
          {isUnregistered && <UnregisteredMessage />}
        </div>
      </Layout>
    </>
  );
};
