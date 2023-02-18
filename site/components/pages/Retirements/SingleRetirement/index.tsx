import { t, Trans } from "@lingui/macro";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";

import { ButtonPrimary, Spinner, Text } from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import {
  concatAddress,
  getRetirementTokenByAddress,
  queryKlimaRetireByIndex,
} from "@klimadao/lib/utils";

import { retirementTokenInfoMap } from "lib/getTokenInfo";

import { DownloadCertificateButtonProps } from "./DownloadCertificateButton";
import { RetirementDate } from "./RetirementDate";
import { RetirementValue } from "./RetirementValue";
import * as styles from "./styles";
import { TextGroup } from "./TextGroup";

import { SingleRetirementPageProps } from "pages/retirements/[beneficiary]/[retirement_index]";
import { useEffect } from "react";
import { SingleRetirementLayout } from "./SingleRetirementLayout";

const DownloadCertificateButton: React.ComponentType<DownloadCertificateButtonProps> =
  dynamic(
    () =>
      import("./DownloadCertificateButton").then(
        (mod) => mod.DownloadCertificateButton
      ),
    {
      ssr: false,
      loading: () => (
        <ButtonPrimary
          disabled
          label={t({
            id: "shared.loading",
            message: "Loading...",
          })}
        />
      ),
    }
  );

export const SingleRetirementPage: NextPage<SingleRetirementPageProps> = ({
  retirement, // destructure so ts can properly narrow retirement.pending types
  ...props
}) => {
  const { asPath } = useRouter();

  useEffect(() => {
    if (!retirement.pending) return;
    const rescursivePoller = async () => {
      // wait 5 seconds
      await new Promise((res) => setTimeout(res, 5000));
      // check if its available yet
      const result = await queryKlimaRetireByIndex(
        props.beneficiaryAddress,
        parseInt(props.retirementIndex)
      );
      if (result) {
        return window.location.reload();
      }
      // otherwise wait 5 more seconds and try again
      await rescursivePoller();
    };
    rescursivePoller();
  }, []);

  if (retirement.pending) {
    return (
      <SingleRetirementLayout
        beneficiaryAddress={props.beneficiaryAddress}
        nameserviceDomain={props.nameserviceDomain}
        pledge={props.pledge}
        projectDetails={props.projectDetails}
        retirement={retirement}
        canonicalUrl={props.canonicalUrl}
      >
        <div className={styles.pending}>
          <div className="spinnerTitle">
            <Spinner />
            <Text>
              <Trans>Processing data...</Trans>
            </Text>
          </div>
          <Text t="caption" align="center">
            <Trans>
              We haven't finished processing the blockchain data for this
              retirement. This usually takes a few seconds, but might take
              longer if the network is congested.
            </Trans>
          </Text>
        </div>
      </SingleRetirementLayout>
    );
  }
  const tokenType =
    getRetirementTokenByAddress(retirement.offset.tokenAddress) || "bct";
  // TODO this doesn't work with TCO2, will quickly follow up to fix this
  const tokenData = retirementTokenInfoMap[tokenType];

  return (
    <SingleRetirementLayout
      beneficiaryAddress={props.beneficiaryAddress}
      nameserviceDomain={props.nameserviceDomain}
      pledge={props.pledge}
      projectDetails={props.projectDetails}
      retirement={retirement}
      canonicalUrl={props.canonicalUrl}
    >
      <>
        <RetirementValue
          value={retirement.amount}
          label={tokenData.label}
          icon={tokenData.icon}
        />
        <div className={styles.metaData}>
          <div className="column">
            <TextGroup
              title={
                <Trans id="retirement.single.beneficiary.title">
                  Beneficiary
                </Trans>
              }
              text={
                retirement.beneficiary ||
                t({
                  id: "retirement.single.beneficiary.placeholder",
                  message: "No beneficiary name provided",
                })
              }
            />
            <TextGroup
              title={
                <Trans id="retirement.single.beneficiaryAddress.title">
                  Beneficiary Address
                </Trans>
              }
              text={
                <Link
                  href={`/retirements/${
                    props.nameserviceDomain || props.beneficiaryAddress
                  }`}
                  className="address"
                >
                  {props.nameserviceDomain ||
                    concatAddress(props.beneficiaryAddress)}
                </Link>
              }
            />
          </div>
          <div className="column">
            <RetirementDate timestamp={retirement.timestamp} />
            <TextGroup
              title={
                <Trans id="retirement.single.retirementCertificate.title">
                  Certificate
                </Trans>
              }
              text={
                retirement ? (
                  <DownloadCertificateButton
                    beneficiaryName={retirement.beneficiary}
                    beneficiaryAddress={props.beneficiaryAddress}
                    retirement={retirement}
                    retirementIndex={props.retirementIndex}
                    retirementMessage={retirement.retirementMessage}
                    retirementUrl={`${urls.home}/${asPath}`}
                    projectDetails={props.projectDetails ?? undefined}
                    tokenData={tokenData}
                  />
                ) : null
              }
            />
          </div>
        </div>
      </>
    </SingleRetirementLayout>
  );
};
