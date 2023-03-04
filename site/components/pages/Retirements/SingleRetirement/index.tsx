import { cx } from "@emotion/css";
import {
  ButtonPrimary,
  CopyAddressButton,
  Section,
  Spinner,
  Text,
} from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import {
  concatAddress,
  formatTonnes,
  getImageSizes,
  getRetirementTokenByAddress,
  queryKlimaRetireByIndex,
} from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import { FacebookButton } from "components/FacebookButton";
import { Footer } from "components/Footer";
import { LinkedInButton } from "components/LinkedInButton";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { TweetButton } from "components/TweetButton";
import { carbonTokenInfoMap } from "lib/getTokenInfo";
import { normalizeProjectId } from "lib/normalizeProjectId";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SingleRetirementPageProps } from "pages/retirements/[beneficiary]/[retirement_index]";
import sunsetMountains from "public/sunset-mountains.jpg";
import { useEffect } from "react";
import { RetirementFooter } from "../Footer";
import { BuyKlima } from "./BuyKlima";
import { DownloadCertificateButtonProps } from "./DownloadCertificateButton";
import { ProjectDetails } from "./ProjectDetails";
import { RetirementDate } from "./RetirementDate";
import { RetirementHeader } from "./RetirementHeader";
import { RetirementMessage } from "./RetirementMessage";
import { RetirementValue } from "./RetirementValue";
import * as styles from "./styles";
import { TextGroup } from "./TextGroup";
import { ViewPledgeButton } from "./ViewPledgeButton";

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
  const { asPath, locale } = useRouter();

  const formattedAmount = formatTonnes({
    amount: retirement.amount,
    locale: locale || "en",
  });

  const retiree =
    retirement.beneficiary ||
    props.nameserviceDomain ||
    concatAddress(props.beneficiaryAddress);

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

  const poolTokenName =
    !retirement.pending && getRetirementTokenByAddress(retirement.pool); // can be null
  const projectTokenName = retirement.pending
    ? null
    : retirement.offset.bridge === "Toucan"
    ? "tco2"
    : "c3t";
  const carbonTokenName = poolTokenName || projectTokenName;
  const tokenData = carbonTokenName && carbonTokenInfoMap[carbonTokenName];

  return (
    <>
      <PageHead
        title={t({
          id: "retirement.head.title",
          message: `KlimaDAO | Carbon Retirement Receipt`,
        })}
        mediaTitle={t({
          id: "retirement.head.metaTitle",
          message: `${retiree} retired ${formattedAmount} Tonnes of carbon`,
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
          overline={retirement.beneficiary}
          title={`${formattedAmount}t`}
          subline={
            <Trans id="retirement.single.header.subline">
              CO2-Equivalent Emissions Offset (Metric Tonnes)
            </Trans>
          }
        />
        <div className={styles.retirementContent}>
          <RetirementMessage message={retirement.retirementMessage} />
          {retirement.pending && (
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
          )}
          {tokenData && (
            <RetirementValue
              value={formattedAmount}
              label={tokenData.label}
              icon={tokenData.icon}
            />
          )}
          {!retirement.pending && tokenData && (
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
                        tokenData={tokenData}
                        projectId={normalizeProjectId({
                          id: retirement.offset.projectID,
                          standard: retirement.offset.standard,
                        })}
                      />
                    ) : null
                  }
                />
              </div>
            </div>
          )}
          <Text className={styles.data_description} t="caption" align="start">
            <Trans id="retirement.single.disclaimer">
              This represents the permanent retirement of tokenized carbon
              assets on the Polygon blockchain. This retirement and the
              associated data are immutable public records.
            </Trans>
          </Text>
          <div className={styles.pledge_button}>
            <ViewPledgeButton pledge={props.pledge} />
            {props.pledge === null && (
              <Text className={styles.create_pledge} t="caption" align="center">
                <Trans id="retirement.single.is_this_your_retirement">
                  Is this your retirement?
                </Trans>
                <Link href={`/pledge/${props.beneficiaryAddress}`}>
                  <Trans id="retirement.single.create_a_pledge">
                    Create a pledge now.
                  </Trans>
                </Link>
              </Text>
            )}
          </div>
        </div>
      </Section>
      <Section variant="gray" className={styles.section}>
        <div className={styles.share_content}>
          <Image
            alt="Sunset Mountains"
            src={sunsetMountains}
            layout="fill"
            objectFit="cover"
            sizes={getImageSizes({ large: "1072px" })}
            placeholder="blur"
            className="image"
          />
          <Text className="title" t="h3">
            <Trans id="retirement.share.title">Share your impact</Trans>
          </Text>
          <div className="buttons">
            <TweetButton
              title={`${retiree} retired ${formattedAmount} Tonnes of carbon`}
              tags={["klimadao", "Offset"]}
            />
            <FacebookButton />
            <LinkedInButton />
            <CopyAddressButton variant="lightGray" shape="circle" />
          </div>
        </div>
      </Section>
      {!retirement.pending && retirement.offset && (
        <Section variant="gray" className={styles.section}>
          <ProjectDetails offset={retirement.offset} />
        </Section>
      )}
      <Section variant="gray" className={styles.section}>
        <RetirementFooter />
      </Section>
      <Section variant="gray" className={styles.section}>
        <BuyKlima />
      </Section>
      <Section
        variant="gray"
        className={cx(styles.section, styles.sectionButtons)}
      >
        <div className={styles.sectionButtonsWrap}>
          <CopyAddressButton label="Copy Link" variant="gray" />
          {!retirement.pending && retirement.transaction.id && (
            <ButtonPrimary
              href={`https://polygonscan.com/tx/${retirement.transaction.id}`}
              target="_blank"
              variant="gray"
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
      <Footer />
    </>
  );
};
