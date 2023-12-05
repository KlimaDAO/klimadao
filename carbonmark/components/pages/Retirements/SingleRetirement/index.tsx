import { cx } from "@emotion/css";
import { GridContainer, Section } from "@klimadao/lib/components";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import {
  concatAddress,
  formatTonnes,
  getRetirementTokenByAddress,
  queryKlimaRetireByIndex,
} from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { Footer } from "components/Footer";
import { PageHead } from "components/PageHead";
import { Text } from "components/Text";
import { Col } from "components/TwoColLayout";
import { Navigation } from "components/shared/Navigation";
import { Spinner } from "components/shared/Spinner";
import { carbonTokenInfoMap } from "lib/getTokenInfo";
import { CategoryName, DetailedProject } from "lib/types/carbonmark.types";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RetirementFooter } from "../Footer";
import { BeneficiaryDetails } from "./BeneficiaryDetails";
import { ProjectDetails } from "./ProjectDetails";
import { RetirementDate } from "./RetirementDate";
import { RetirementHeader } from "./RetirementHeader";
import { RetirementMessage } from "./RetirementMessage";
import { ShareDetails } from "./ShareDetails";
import { TransactionDetails } from "./TransactionDetails";
import * as styles from "./styles";

export interface SingleRetirementPageProps {
  /** The resolved 0x address */
  beneficiaryAddress: string;
  retirement: KlimaRetire | null;
  retirementIndex: string;
  nameserviceDomain: string | null;
  /** Version of this page that google will rank. Prefers nameservice, otherwise is a self-referential 0x canonical */
  canonicalUrl?: string;
  project?: DetailedProject | null;
}

export const SingleRetirementPage: NextPage<SingleRetirementPageProps> = ({
  retirement, // destructure so ts can properly narrow retirement.pending types
  ...props
}) => {
  const { locale } = useRouter();

  useEffect(() => {
    if (retirement) return;
    const rescursivePoller = async () => {
      // wait 1 seconds
      await new Promise((res) => setTimeout(res, 1000));
      // check if its available yet
      const result = await queryKlimaRetireByIndex(
        props.beneficiaryAddress,
        /** Retirement indexes start from 0, url starts from 1 */
        Number(props.retirementIndex) - 1
      );
      if (result) {
        return window.location.reload();
      }
      // otherwise wait 1 more second and try again
      await rescursivePoller();
    };
    rescursivePoller();
  }, []);

  if (!retirement) {
    return (
      <GridContainer>
        <Navigation activePage="Home" />
        <Section className={styles.section}>
          <div className={styles.pending}>
            <div className="spinnerTitle">
              <Spinner />
              <Text t="h5">
                <Trans>Processing retirement...</Trans>
              </Text>
            </div>
            <Text align="center">
              <Trans>
                Your transaction was successful, but the network is taking
                longer than expected to process the data. Your retirement
                details should appear here in just a few seconds!
              </Trans>
            </Text>
          </div>
        </Section>
      </GridContainer>
    );
  }

  const formattedAmount = formatTonnes({
    amount: retirement.amount,
    locale: locale || "en",
  });

  const retiree =
    retirement.beneficiary ||
    props.nameserviceDomain ||
    concatAddress(props.beneficiaryAddress);

  const poolTokenName = getRetirementTokenByAddress(retirement.pool); // can be null
  const projectTokenName =
    retirement.offset.bridge === "Toucan" ? "tco2" : "c3t";
  const isMossOffset = retirement?.offset?.bridge === "Moss";
  const carbonTokenName = poolTokenName || projectTokenName;
  const tokenData = carbonTokenInfoMap[carbonTokenName];

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
            {retirement.beneficiary && props.beneficiaryAddress && (
              <BeneficiaryDetails
                beneficiary={retirement.beneficiary}
                beneficiaryAddress={props.beneficiaryAddress}
              />
            )}
            {retirement.retirementMessage && (
              <RetirementMessage message={retirement.retirementMessage} />
            )}
            <ShareDetails
              retiree={retiree}
              formattedAmount={formattedAmount}
              beneficiaryName={retirement.beneficiary}
              retirementIndex={props.retirementIndex}
              beneficiaryAddress={props.beneficiaryAddress}
            />
            <div className={styles.visibleDesktop}>
              <TransactionDetails
                tokenData={tokenData}
                retirement={retirement}
              />
            </div>
          </Col>
          <Col className="column">
            <ProjectDetails
              retirement={retirement}
              isMossOffset={isMossOffset}
              description={
                props.project?.long_description ?? props.project?.description
              }
              category={
                (props.project?.methodologies?.[0]?.category as CategoryName) ??
                null
              }
            />
            <div className={cx(styles.visibleMobile)}>
              <TransactionDetails
                tokenData={tokenData}
                retirement={retirement}
              />
            </div>
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
