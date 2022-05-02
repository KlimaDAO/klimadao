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
};

export const RetirementPage: NextPage<Props> = (props) => {
  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title={t({
          id: "retirement.totals.head.title",
          message: "Your total retirements",
        })}
        mediaTitle={t({
          id: "retirement.totals.head.title",
          message: "Your total retirements",
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
