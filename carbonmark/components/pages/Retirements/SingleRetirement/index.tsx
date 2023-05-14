import { GridContainer, Section } from "@klimadao/lib/components";
import {
  concatAddress,
  formatTonnes,
  getRetirementTokenByAddress,
  queryKlimaRetireByIndex,
} from "@klimadao/lib/utils";
import { t, Trans } from "@lingui/macro";
import LaunchIcon from "@mui/icons-material/Launch";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import { ButtonPrimary } from "components/Buttons/ButtonPrimary";
import { CopyAddressButton } from "components/CopyAddressButton";
import { FacebookButton } from "components/FacebookButton";
import { Footer } from "components/Footer";
import { LinkedInButton } from "components/LinkedInButton";
import { PageHead } from "components/PageHead";
import { ProjectImage } from "components/ProjectImage";
import { Navigation } from "components/shared/Navigation";
import { Text } from "components/Text";
import { TweetButton } from "components/TweetButton";
import { Col } from "components/TwoColLayout";
import { useFetchProject } from "hooks/useFetchProject";
import { urls } from "lib/constants";
import { carbonTokenInfoMap } from "lib/getTokenInfo";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { SingleRetirementPageProps } from "pages/retirements/[beneficiary]/[retirement_index]";
import { useEffect } from "react";
import { RetirementFooter } from "../Footer";
import { DownloadCertificateButtonProps } from "./DownloadCertificateButton";
import { RetirementDate } from "./RetirementDate";
import { RetirementMessage } from "./RetirementMessage";
import * as styles from "./styles";

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
          variant="blue"
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

  const { project } = useFetchProject(
    retirement.offset.projectID + "-" + retirement.offset.vintageYear
  );

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
    <GridContainer>
      <PageHead
        title={t({
          id: "retirement.head.title",
          message: `Carbonmark | Carbon Retirement Receipt`,
        })}
        mediaTitle={t({
          id: "retirement.head.metaTitle",
          message: `${retiree} retired ${formattedAmount} Tonnes of carbon`,
        })}
        metaDescription={t({
          id: "retirement.head.metaDescription",
          message: "Transparent, on-chain offsets powered by Carbonmark.",
        })}
        canonicalUrl={props.canonicalUrl}
      />
      <Navigation activePage="Home" />

      <Section className={styles.section}>
        <div className={styles.gridLayout}>
          <Col className="column">
            <RetirementDate timestamp={retirement?.timestamp} />
            <div style={{ margin: "2rem 0 0" }}>
              <Text t="h5" color="lightest">
                Proof of
              </Text>
              <Text
                t="h3"
                style={{
                  color: "var(--font-01)",
                }}
              >
                Carbon Credit Retirement
              </Text>
            </div>

            <div style={{ margin: "2rem 0 0" }}>
              <Text
                t="h1"
                style={{
                  fontSize: "16rem",
                  lineHeight: "16rem",
                  color: "var(--bright-blue)",
                  letterSpacing: "-0.04em",
                }}
              >
                {`${formattedAmount}`}t
              </Text>
              <Text t="button" color="lightest">
                Verified tonnes of carbon retired
              </Text>
            </div>

            {/* Beneficiary Card... */}
            <div className={styles.retirementContent}>
              <div className={styles.profileLogo}>
                <PermIdentityOutlinedIcon className="placeholderIcon" />
              </div>

              <div className={styles.textGroup}>
                <Text t="button" color="lightest" uppercase>
                  <Trans id="retirement.single.beneficiary.title">
                    Beneficiary:
                  </Trans>
                </Text>
                <Text t="h4">
                  {retirement.beneficiary ||
                    t({
                      id: "retirement.single.beneficiary.placeholder",
                      message: "No beneficiary name provided",
                    })}
                </Text>

                {/* ------ Make into link component ----- */}
                <Text
                  t="button"
                  color="lightest"
                  uppercase
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1.45rem",
                    marginTop: "0.2rem",
                    color: "var(--bright-blue)",
                  }}
                >
                  View Carbonmark Profile
                  <LaunchIcon />
                </Text>
                {/* ------ Make into link component ----- */}
              </div>
            </div>

            <RetirementMessage message={retirement.retirementMessage} />

            {/* ------- Share this retirement card ------- */}
            <div
              className={styles.retirementContent}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.8rem",
              }}
            >
              <Text t="button" color="lightest">
                Share this retirement
              </Text>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.6rem",
                  marginBottom: "1.4rem",
                }}
              >
                {retirement ? (
                  <DownloadCertificateButton
                    beneficiaryName={retirement.beneficiary}
                    beneficiaryAddress={props.beneficiaryAddress}
                    retirement={retirement}
                    retirementIndex={props.retirementIndex}
                    retirementMessage={retirement.retirementMessage}
                    retirementUrl={`${urls.baseUrl}/${asPath}`}
                    // tokenData={tokenData}
                    // projectId={normalizeProjectId({
                    //   id: retirement.offset.projectID,
                    //   standard: retirement.offset.standard,
                    // })}
                  />
                ) : null}
                <div className={styles.share_content}>
                  <div className="buttons">
                    <TweetButton
                      title={`${retiree} retired ${formattedAmount} Tonnes of carbon`}
                      tags={["Carbonmark", "Offset"]}
                    />
                    <FacebookButton />
                    <LinkedInButton />
                    <CopyAddressButton />
                  </div>
                </div>
              </div>

              {/* ------ Make into link component ----- */}
              <Text
                t="button"
                color="lightest"
                uppercase
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "1.45rem",
                  color: "var(--bright-blue)",
                }}
              >
                Create your own retirement
                <LaunchIcon />
              </Text>
              {/* ------ Make into link component ----- */}
            </div>

            {/* -------- Mutable Transaction Records Component -------- */}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <section style={{ marginBottom: "1.4rem" }}>
                <div className={styles.mutableTextGroup}>
                  <Text t="button" color="lightest" uppercase>
                    Mutable transaction record
                  </Text>
                </div>

                <div className={styles.mutableTextGroup}>
                  <Text
                    t="button"
                    color="lightest"
                    uppercase
                    style={{ fontSize: "1.2rem" }}
                  >
                    <Trans id="retirement.single.title.beneficiary.address">
                      Beneficiary Address:
                    </Trans>
                  </Text>
                  <Text style={{ fontSize: "1.4rem" }}>
                    {retirement.beneficiaryAddress ||
                      t({
                        id: "retirement.single.beneficiary.address.placeholder",
                        message: "No beneficiary address available",
                      })}
                  </Text>
                </div>

                <div className={styles.mutableTextGroup}>
                  <Text
                    t="button"
                    color="lightest"
                    uppercase
                    style={{ fontSize: "1.2rem" }}
                  >
                    <Trans id="retirement.single.title.transaction.id">
                      Transaction ID
                    </Trans>
                  </Text>
                  <Text style={{ fontSize: "1.4rem" }}>
                    {retirement.transaction?.id ||
                      t({
                        id: "retirement.single.transaction.id.placeholder",
                        message: "No transaction id available",
                      })}
                  </Text>
                </div>
              </section>

              {/* ----- Retired Assets Component ----- */}
              <div className={styles.gridLayout} style={{ maxWidth: "80%" }}>
                <Col className="column">
                  <div className={styles.mutableTextGroupHorizontal}>
                    <Text
                      t="button"
                      color="lightest"
                      uppercase
                      style={{ fontSize: "1.2rem" }}
                    >
                      Asset Retired:
                    </Text>
                    <Text style={{ fontSize: "1.4rem" }}>
                      {tokenData?.label}
                    </Text>
                  </div>
                  <div className={styles.mutableTextGroupHorizontal}>
                    <Text
                      t="button"
                      color="lightest"
                      uppercase
                      style={{ fontSize: "1.2rem" }}
                    >
                      Project:
                    </Text>
                    <Text style={{ fontSize: "1.4rem" }}>
                      {retirement.offset.projectID}
                    </Text>
                  </div>
                  <div className={styles.mutableTextGroupHorizontal}>
                    <Text
                      t="button"
                      color="lightest"
                      uppercase
                      style={{ fontSize: "1.2rem" }}
                    >
                      Type:
                    </Text>
                    <Text style={{ fontSize: "1.4rem" }}>
                      {retirement.offset.methodologyCategory}
                    </Text>
                  </div>
                </Col>
                <Col className="column">
                  <div className={styles.mutableTextGroupHorizontal}>
                    <Text
                      t="button"
                      color="lightest"
                      uppercase
                      style={{ fontSize: "1.2rem" }}
                    >
                      Methodology:
                    </Text>
                    <Text style={{ fontSize: "1.4rem" }}>
                      {retirement.offset.methodology}
                    </Text>
                  </div>
                  <div className={styles.mutableTextGroupHorizontal}>
                    <Text
                      t="button"
                      color="lightest"
                      uppercase
                      style={{ fontSize: "1.2rem" }}
                    >
                      Country/Region:
                    </Text>
                    <Text style={{ fontSize: "1.4rem" }}>
                      {retirement.offset.country || retirement.offset.region}
                    </Text>
                  </div>
                  <div className={styles.mutableTextGroupHorizontal}>
                    <Text
                      t="button"
                      color="lightest"
                      uppercase
                      style={{ fontSize: "1.2rem" }}
                    >
                      Vintage:
                    </Text>
                    <Text style={{ fontSize: "1.4rem" }}>
                      {retirement.offset.vintage}
                    </Text>
                  </div>
                </Col>
              </div>
              {/* ----- Retired Assets Component ----- */}
            </div>

            {/* -------- Mutable Transaction Records Component -------- */}
          </Col>
          <Col>
            <div
              style={{
                padding: "2rem",
                width: "100%",
                border: "1px solid #8B8FAE",
              }}
            >
              <Text t="h4" color="lighter">
                Project Details
              </Text>

              <div className={styles.retirementHeader}>
                <div className={styles.imageGradient}>
                  <ProjectImage category={retirement.category ?? "Other"} />
                </div>
              </div>

              <div
                style={{
                  margin: "2rem 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                }}
              >
                <Text t="button" color="lightest">
                  Project Name
                </Text>
                <Text>{retirement.offset.name}</Text>
              </div>

              {/* <ProjectDetails offset={retirement.offset} /> */}
              <>{console.log("retirement", retirement)}</>
              <div
                style={{
                  margin: "2rem 0",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.8rem",
                }}
              >
                <Text t="button" color="lightest">
                  Description
                </Text>
                <Text>{project?.description}</Text>
              </div>
            </div>
          </Col>
        </div>

        {/* <RetirementHeader
          overline={retirement.beneficiary}
          title={`${formattedAmount}t`}
          subline={
            <Trans id="retirement.single.header.subline">
              CO2-Equivalent Emissions Offset (Metric Tonnes)
            </Trans>
          }
        /> */}

        {/* <div className={styles.retirementContent}>
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
                        retirementUrl={`${urls.baseUrl}/${asPath}`}
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
          <Text t="caption" align="start" className={styles.data_description}>
            <Trans id="retirement.single.disclaimer">
              This represents the permanent retirement of tokenized carbon
              assets on the Polygon blockchain. This retirement and the
              associated data are immutable public records.
            </Trans>
          </Text>
        </div> */}
      </Section>

      <Section className={styles.section} style={{ paddingTop: 0 }}>
        <RetirementFooter />
      </Section>

      {/* <Section variant="gray" className={styles.section}>
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
              tags={["Carbonmark", "Offset"]}
            />
            <FacebookButton />
            <LinkedInButton />
            <CopyAddressButton variant="lightGray" shape="circle" />
          </div>
        </div>
      </Section> */}

      {/* {!retirement.pending && retirement.offset && (
        <Section variant="gray" className={styles.section}>
          <ProjectDetails offset={retirement.offset} />
        </Section>
      )}
     */}
      {/* <Section
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
      </Section> */}
      <Footer />
    </GridContainer>
  );
};
