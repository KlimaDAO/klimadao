import { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";
import { Trans, t } from "@lingui/macro";

import { Text, Section, ButtonPrimary } from "@klimadao/lib/components";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { RetirementIndexInfoResult } from "@klimadao/lib/types/offset";
import { VerraProjectDetails } from "@klimadao/lib/types/verra";
import { concatAddress, trimWithLocale } from "@klimadao/lib/utils";
import { urls } from "@klimadao/lib/constants";

import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";
import { TweetButton } from "components/TweetButton";
import { FacebookButton } from "components/FacebookButton";
import { LinkedInButton } from "components/LinkedInButton";
import { retirementTokenInfoMap } from "lib/getTokenInfo";

import { DownloadCertificateButtonProps } from "./DownloadCertificateButton";
import { RetirementHeader } from "./RetirementHeader";
import { RetirementMessage } from "./RetirementMessage";
import { RetirementValue } from "./RetirementValue";
import { RetirementDate } from "./RetirementDate";
import { TextGroup } from "./TextGroup";
import { ProjectDetails } from "./ProjectDetails";
import { RetirementFooter } from "../Footer";
import { CopyURLButton } from "../CopyURLButton";
import * as styles from "./styles";

const LoadingCertificateButton: React.FC = () => (
  <ButtonPrimary
    disabled={true}
    label={t({
      id: "shared.loading",
      message: "Loading...",
    })}
  />
);

const DownloadCertificateButton: React.ComponentType<DownloadCertificateButtonProps> =
  dynamic(
    () =>
      import("./DownloadCertificateButton").then(
        (mod) => mod.DownloadCertificateButton
      ),
    {
      ssr: false,
      loading: () => <LoadingCertificateButton />,
    }
  );

type Props = {
  beneficiaryAddress: string;
  retirement: KlimaRetire | null;
  retirementIndex: string;
  retirementIndexInfo: RetirementIndexInfoResult;
  projectDetails?: VerraProjectDetails;
  nameserviceDomain?: string;
  canonicalUrl?: string;
};

export const SingleRetirementPage: NextPage<Props> = (props) => {
  const {
    beneficiaryAddress,
    retirement,
    retirementIndexInfo,
    nameserviceDomain,
  } = props;
  const { locale, asPath } = useRouter();
  const tokenData = retirementTokenInfoMap[retirementIndexInfo.typeOfToken];

  const amountWithoutWhiteSpace = retirementIndexInfo.amount.replace(
    /\.?0+$/,
    ""
  ); // remove whitespace 0s from string, e.g. 1.0 => 1

  // collect from indexInfo and optional data from subgraph
  const retireData = {
    amount: trimWithLocale(amountWithoutWhiteSpace, 2, locale),
    tokenLabel: tokenData.label,
    tokenIcon: tokenData.icon,
    beneficiaryName: retirementIndexInfo.beneficiaryName,
    retirementMessage: retirementIndexInfo.retirementMessage,
    timestamp: retirement?.timestamp || null,
    transactionID: retirement?.transaction?.id || null,
  };

  const retiree =
    retireData.beneficiaryName ||
    nameserviceDomain ||
    concatAddress(beneficiaryAddress);

  return (
    <>
      <PageHead
        title={t({
          id: "retirement.head.title",
          message: `KlimaDAO | Carbon Retirement Receipt`,
        })}
        mediaTitle={t({
          id: "retirement.head.metaTitle",
          message: `${retiree} retired ${retireData.amount} Tonnes of carbon`,
        })}
        metaDescription={t({
          id: "retirement.head.metaDescription",
          message: "Transparent, on-chain offsets powered by KlimaDAO.",
        })}
        canonicalUrl={props.canonicalUrl}
      />
      <Navigation activePage="Home" />

      <Section variant="gray" className={styles.section}>
        <RetirementHeader
          overline={retireData.beneficiaryName}
          title={t({
            id: "retirement.single.header.quantity",
            message: `${retireData.amount}t`,
          })}
          subline={
            <Trans id="retirement.single.header.subline">
              CO2-Equivalent Emissions Offset (Metric Tonnes)
            </Trans>
          }
        />
        <div className={styles.retirementContent}>
          <RetirementMessage
            message={
              retireData.retirementMessage ||
              t({
                id: "retirement.single.retirementMessage.placeholder",
                message: "No retirement message provided",
              })
            }
          />
          <RetirementValue
            value={retireData.amount}
            label={retireData.tokenLabel}
            icon={retireData.tokenIcon}
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
                  retireData.beneficiaryName ||
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
                      nameserviceDomain || beneficiaryAddress
                    }`}
                    className="address"
                  >
                    {nameserviceDomain || concatAddress(beneficiaryAddress)}
                  </Link>
                }
              />
            </div>
            <div className="column">
              <RetirementDate timestamp={retireData.timestamp} />
              <TextGroup
                title={
                  <Trans id="retirement.single.retirementCertificate.title">
                    Certificate
                  </Trans>
                }
                text={
                  retirement ? (
                    <DownloadCertificateButton
                      beneficiaryName={retireData.beneficiaryName}
                      beneficiaryAddress={beneficiaryAddress}
                      retirement={retirement}
                      retirementIndex={props.retirementIndex}
                      retirementMessage={retireData.retirementMessage}
                      retirementUrl={`${urls.home}/${asPath}`}
                      projectDetails={props.projectDetails}
                      tokenData={tokenData}
                    />
                  ) : (
                    <LoadingCertificateButton />
                  )
                }
              />
            </div>
          </div>
          <Text className={styles.data_description} t="body2" align="center">
            <Trans id="retirement.single.disclaimer">
              This represents the permanent retirement of tokenized carbon
              assets on the Polygon blockchain. This retirement and the
              associated data are immutable public records.
            </Trans>
          </Text>
        </div>
      </Section>

      <Section variant="gray" className={styles.sectionButtons}>
        <div className={styles.sectionButtonsWrap}>
          <TweetButton
            title={`${retiree} retired ${retireData.amount} Tonnes of carbon`}
            tags={["klimadao", "Offset"]}
          />
          <FacebookButton />
          <LinkedInButton />
        </div>
      </Section>

      <Section variant="gray" className={styles.sectionButtons}>
        <div className={styles.sectionButtonsWrap}>
          <CopyURLButton />
          {retireData.transactionID && (
            <ButtonPrimary
              variant="gray"
              href={`https://polygonscan.com/tx/${retireData.transactionID}`}
              target="_blank"
              rel="noopener noreferrer"
              label={t({
                id: "retirement.single.view_on_polygon_scan",
                message: "View on Polygonscan",
              })}
              className={styles.buttonViewOnPolygon}
            />
          )}
        </div>
      </Section>

      {props.retirement?.offset && (
        <ProjectDetails
          projectDetails={props.projectDetails}
          offset={props.retirement.offset}
        />
      )}

      <RetirementFooter />
      <Footer />
    </>
  );
};
