import { cx } from "@emotion/css";
import {
  ButtonPrimary,
  CopyValueButton,
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
} from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { FacebookButton } from "components/FacebookButton";
import { Footer } from "components/Footer";
import { LinkedInButton } from "components/LinkedInButton";
import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { TweetButton } from "components/TweetButton";
import { carbonTokenInfoMap } from "lib/getTokenInfo";
import { normalizeProjectId } from "lib/normalizeProjectId";
import { isNil } from "lodash";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { SingleRetirementPageProps } from "pages/retirements/[beneficiary]/[retirement_index]";
import sunsetMountains from "public/sunset-mountains.jpg";
import { RetirementFooter } from "../Footer";
import { BuyKlima } from "./BuyKlima";
import { DownloadCertificateButtonProps } from "./DownloadCertificateButton";
import { ProjectDetails } from "./ProjectDetails";
import { RetirementDate } from "./RetirementDate";
import { RetirementHeader } from "./RetirementHeader";
import { RetirementMessage } from "./RetirementMessage";
import { RetirementValue } from "./RetirementValue";
import { TextGroup } from "./TextGroup";
import { ViewPledgeButton } from "./ViewPledgeButton";
import * as styles from "./styles";

const DownloadCertificateButton: React.ComponentType<DownloadCertificateButtonProps> =
  dynamic(
    () =>
      import("./DownloadCertificateButton").then(
        (mod) => mod.DownloadCertificateButton
      ),
    {
      ssr: false,
      loading: () => <ButtonPrimary disabled label={t`Loading...`} />,
    }
  );

export const SingleRetirementPage: NextPage<SingleRetirementPageProps> = ({
  retirement, // destructure so ts can properly narrow retirement.pending types
  ...props
}) => {
  const { asPath, locale } = useRouter();

  let formattedAmount: string | undefined;
  let retiree: string | undefined;
  let poolTokenName: false | "ubo" | "nbo" | "bct" | "nct" | "mco2" | null;
  let projectTokenName: "tco2" | "c3t" | null;
  let carbonTokenName:
    | "ubo"
    | "nbo"
    | "bct"
    | "nct"
    | "mco2"
    | "tco2"
    | "c3t"
    | null;

  let tokenData: {
    key: string;
    icon: StaticImageData;
    label: "UBO" | "NBO" | "BCT" | "NCT" | "MCO2" | "TCO2" | "C3T" | "ICR";
  } = {
    key: "",
    // es-lint disable-next-line @typescript-eslint/no-non-null-assertion
    icon: null as unknown as StaticImageData,
    label: "UBO",
  };
  let retirementMessage: string | undefined;
  let beneficiaryName: string | undefined;
  let registry: string | undefined;

  if ("retire" in retirement) {
    formattedAmount = formatTonnes({
      amount: retirement.retire.amount,
      locale: locale || "en",
    });

    retiree =
      retirement.retire.beneficiaryName ||
      props.nameserviceDomain ||
      concatAddress(props.beneficiaryAddress);

    poolTokenName =
      !retirement.pending &&
      getRetirementTokenByAddress(
        retirement.retire.credit.poolBalances.pool.id
      );
    projectTokenName =
      retirement.retire.credit.bridgeProtocol === "TOUCAN" ? "tco2" : "c3t";
    carbonTokenName = poolTokenName || projectTokenName;
    tokenData = carbonTokenName && carbonTokenInfoMap[carbonTokenName];
    retirementMessage = retirement.retire.retirementMessage;
    beneficiaryName = retirement.retire.beneficiaryName;
  } else if (retirement.pending) {
    formattedAmount = formatTonnes({
      amount: retirement.amount,
      locale: locale || "en",
    });
    retiree =
      props.nameserviceDomain || concatAddress(props.beneficiaryAddress);
    carbonTokenName = registry === "Toucan" ? "tco2" : "c3t";
    tokenData = carbonTokenName && carbonTokenInfoMap[carbonTokenName];
  }

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
          overline={beneficiaryName}
          title={`${formattedAmount}t`}
          subline={
            <Trans id="retirement.single.header.subline">
              CO2-Equivalent Emissions Offset (Metric Tonnes)
            </Trans>
          }
        />
        <div className={styles.retirementContent}>
          <RetirementMessage message={retirementMessage || ""} />
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
              value={formattedAmount || "0"}
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
                    retirement.retire.beneficiaryName ||
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
                <RetirementDate timestamp={retirement.retire.timestamp} />
                <TextGroup
                  title={
                    <Trans id="retirement.single.retirementCertificate.title">
                      Certificate
                    </Trans>
                  }
                  text={
                    retirement ? (
                      <DownloadCertificateButton
                        beneficiaryName={retirement.retire.beneficiaryName}
                        beneficiaryAddress={props.beneficiaryAddress}
                        retirement={retirement}
                        retirementIndex={props.retirementIndex}
                        retirementMessage={retirement.retire.retirementMessage}
                        retirementUrl={`${urls.home}/${asPath}`}
                        tokenData={tokenData}
                        projectId={normalizeProjectId({
                          id: retirement.retire.credit.project.projectID,
                          standard: retirement.retire.credit.project.registry,
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
            {isNil(props.pledge) && (
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
            <CopyValueButton variant="lightGray" shape="circle" />
          </div>
        </div>
      </Section>
      {!retirement.pending && retirement.retire && (
        <Section variant="gray" className={styles.section}>
          <ProjectDetails retire={retirement.retire} />
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
          <CopyValueButton label="Copy Link" variant="gray" />
          {!retirement.pending && retirement.retire.hash && (
            <ButtonPrimary
              href={`https://polygonscan.com/tx/${retirement.retire.hash}`}
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
