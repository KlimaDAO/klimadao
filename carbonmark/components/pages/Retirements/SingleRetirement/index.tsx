import { GridContainer, Section } from "@klimadao/lib/components";
import {
  concatAddress,
  formatTonnes,
  getRetirementTokenByAddress,
  queryKlimaRetireByIndex,
} from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Footer } from "components/Footer";
import { PageHead } from "components/PageHead";
import { ProjectImage } from "components/ProjectImage";
import { Navigation } from "components/shared/Navigation";
import { Text } from "components/Text";
import { Col } from "components/TwoColLayout";
import { useFetchProject } from "hooks/useFetchProject";
import { carbonTokenInfoMap } from "lib/getTokenInfo";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { SingleRetirementPageProps } from "pages/retirements/[beneficiary]/[retirement_index]";
import { useEffect } from "react";
import { RetirementFooter } from "../Footer";
import { BeneficiaryDetails } from "./BeneficiaryDetails";
import { RetirementDate } from "./RetirementDate";
import { RetirementHeader } from "./RetirementHeader";
import { RetirementMessage } from "./RetirementMessage";
import { ShareDetails } from "./ShareDetails";
import * as styles from "./styles";
import { TransactionDetails } from "./TransactionDetails";

export const SingleRetirementPage: NextPage<SingleRetirementPageProps> = ({
  retirement, // destructure so ts can properly narrow retirement.pending types
  ...props
}) => {
  const { locale } = useRouter();

  const { project } = useFetchProject(
    `${retirement.offset.projectID}-${retirement.offset.vintageYear}`
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
            <RetirementDate timestamp={retirement.timestamp} />
            <RetirementHeader formattedAmount={formattedAmount} />
            <BeneficiaryDetails beneficiary={retirement.beneficiary} />
            <RetirementMessage message={retirement.retirementMessage} />
            <ShareDetails
              retiree={retiree}
              formattedAmount={formattedAmount}
              beneficiaryName={retirement.beneficiary}
              retirementIndex={props.retirementIndex}
              beneficiaryAddress={props.beneficiaryAddress}
            />
            <TransactionDetails retirement={retirement} tokenData={tokenData} />
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
      {/* {!retirement.pending && retirement.offset && (
        <Section variant="gray" className={styles.section}>
          <ProjectDetails offset={retirement.offset} />
        </Section>
      )}
     */}
      <Footer />
    </GridContainer>
  );
};
