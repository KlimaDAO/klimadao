import { GridContainer, Section } from "@klimadao/lib/components";
import {
  concatAddress,
  formatTonnes,
  getRetirementTokenByAddress,
  queryKlimaRetireByIndex,
} from "@klimadao/lib/utils";

import { t, Trans } from "@lingui/macro";
import { Footer } from "components/Footer";
import { PageHead } from "components/PageHead";
import { Navigation } from "components/shared/Navigation";
import { Spinner } from "components/shared/Spinner";
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
import { ProjectDetails } from "./ProjectDetails";
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
          {retirement.pending && (
            <div className={styles.pending}>
              <div className="spinnerTitle">
                <Spinner />
                <Text>
                  <Trans>Processing data...</Trans>
                </Text>
              </div>
              <Text t="button" align="center">
                <Trans>
                  We haven't finished processing the blockchain data for this
                  retirement. This usually takes a few seconds, but might take
                  longer if the network is congested.
                </Trans>
              </Text>
            </div>
          )}
          {!retirement.pending && tokenData && (
            <Col className="column">
              <RetirementDate timestamp={retirement.timestamp} />
              <RetirementHeader formattedAmount={formattedAmount} />
              <BeneficiaryDetails
                beneficiary={retirement.beneficiary}
                beneficiaryAddress={props.beneficiaryAddress}
              />
              <RetirementMessage message={retirement.retirementMessage} />
              <ShareDetails
                retiree={retiree}
                formattedAmount={formattedAmount}
                beneficiaryName={retirement.beneficiary}
                retirementIndex={props.retirementIndex}
                beneficiaryAddress={props.beneficiaryAddress}
              />
              <TransactionDetails
                tokenData={tokenData}
                retirement={retirement}
              />
            </Col>
          )}
          <Col className="column">
            <ProjectDetails
              retirement={retirement}
              description={project?.description}
            />
          </Col>
        </div>
      </Section>
      <Section className={styles.section} style={{ paddingTop: 0 }}>
        <RetirementFooter />
      </Section>
      <Footer />
    </GridContainer>
  );
};
