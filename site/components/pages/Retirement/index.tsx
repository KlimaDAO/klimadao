import { NextPage } from "next";

import { Text, Section } from "@klimadao/lib/components";

import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";
import { RetirementsResult } from "@klimadao/lib/types/offset";

import { IS_PRODUCTION } from "lib/constants";
import { t } from "@lingui/macro";
import * as styles from "./styles";

type Props = {
  retirements: RetirementsResult;
  beneficiaryAddress: string;
};

export const RetirementPage: NextPage<Props> = (props) => {
  const { beneficiaryAddress } = props;
  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title={t({
          id: "retirement.totals.head.title",
          message: `KlimaDao - Your total retirements for address: ${beneficiaryAddress}`,
          values: { beneficiaryAddress },
        })}
        mediaTitle={t({
          id: "retirement.totals.head.title",
          message: `KlimaDao - Your total retirements for address: ${props.beneficiaryAddress}`,
          values: { beneficiaryAddress },
        })}
        metaDescription={t({
          id: "shared.head.description",
          message:
            "Drive climate action and earn rewards with a carbon-backed digital currency.",
        })}
      />
      <Navigation activePage="Home" />

      <Section variant="gray" className={styles.section}>
        <div className={styles.retirementContainer}>
          <div className={styles.retirement_textGroup}>
            <Text t="h2" as="h2" align="center">
              Retirements Total
            </Text>
            <Text align="center">
              beneficiaryAddress: {props.beneficiaryAddress}
            </Text>
            <Text align="center">
              totalRetirements: {props.retirements.totalRetirements}
            </Text>
            <Text align="center">
              totalCarbonRetired: {props.retirements.totalCarbonRetired}
            </Text>
            <Text align="center">
              totalClaimed: {props.retirements.totalClaimed}
            </Text>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};
