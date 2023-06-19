import { concatAddress, useWeb3 } from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { CopyAddressButton } from "components/CopyAddressButton";
import { Layout } from "components/Layout";
import { LoginButton } from "components/LoginButton";
import { PageHead } from "components/PageHead";
import { Spinner } from "components/shared/Spinner";
import { Text } from "components/Text";
import { useGetDomainFromAddress } from "hooks/useGetDomainFromAddress";
import { NextPage } from "next";
import { RetireActivity } from "./Activity";
import * as styles from "./styles";

export const Retire: NextPage = () => {
  const { isConnected, address, initializing } = useWeb3();
  // collect nameserviceDomain Data if connected and domain is in URL
  const connectedDomain = useGetDomainFromAddress(address);

  const beneficiary = connectedDomain?.name || address;
  const displayName =
    connectedDomain?.name || (address && concatAddress(address));

  const isConnectedUser = isConnected && address;

  return (
    <>
      <PageHead
        title={t`Retire | Carbonmark`}
        mediaTitle={t`Retire | Carbonmark`}
        metaDescription={t`View a complete overview of the digital carbon that you retired. `}
      />

      <Layout>
        <div className={styles.container}>
          <div>
            <Text t="h2">
              <Trans>Carbon Retirements</Trans>
            </Text>
            {address && isConnected && (
              <div className={styles.beneficiary}>
                <Text t="body4">
                  <Trans>for beneficiary</Trans>{" "}
                  <span className="highlight">{displayName}</span>
                </Text>
                <CopyAddressButton
                  address={beneficiary}
                  variant="transparent"
                  className="copyButton"
                />
              </div>
            )}
          </div>
          <div className={styles.retireControls}>
            <LoginButton />
          </div>

          {!isConnectedUser && initializing && (
            <div className={styles.spinnerContainer}>
              <Spinner />
            </div>
          )}

          <RetireActivity />
        </div>
      </Layout>
    </>
  );
};
