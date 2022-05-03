import { NextPage } from "next";

import { Text, Section } from "@klimadao/lib/components";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";

import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";

import { IS_PRODUCTION } from "lib/constants";
import { t } from "@lingui/macro";
import * as styles from "../styles";

type Props = {
  beneficiaryAddress: string;
  retirementTotals: string;
  retirement: KlimaRetire;
};

export const SingleRetirementPage: NextPage<Props> = (props) => {
  const { beneficiaryAddress, retirementTotals, retirement } = props;
  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title={t({
          id: "retirement.head.title",
          message: `Your retirement number ${retirementTotals} for address: ${beneficiaryAddress}`,
          values: { retirementTotals, beneficiaryAddress },
        })}
        mediaTitle={t({
          id: "retirement.head.metaTitle",
          message: `Your retirement number ${retirementTotals} for address: ${beneficiaryAddress}`,
          values: { retirementTotals, beneficiaryAddress },
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
              Retirement SINGLE
            </Text>
            <Text align="center">timestamp: {retirement.timestamp}</Text>
            <Text align="center">
              tokenAddress: {retirement.offset.tokenAddress}
            </Text>
            <Text align="center">amount: {retirement.amount}</Text>
            <Text align="center">
              beneficiaryName: {retirement.beneficiary}
            </Text>
            <Text align="center">
              beneficiaryAddress: {retirement.beneficiaryAddress}
            </Text>
            <Text align="center">message: {retirement.retirementMessage}</Text>
            <Text align="center" t="caption">
              blockhash: {retirement.transaction.blockHash}
            </Text>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};
