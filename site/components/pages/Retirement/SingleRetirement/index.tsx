import { NextPage } from "next";

import { Text, Section } from "@klimadao/lib/components";
import { RetirementIndexInfoResult } from "@klimadao/lib/types/offset";

import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";

import { IS_PRODUCTION } from "lib/constants";
import { t } from "@lingui/macro";
import * as styles from "../styles";

type Props = {
  retirementIndexInfo: RetirementIndexInfoResult;
  beneficiaryAddress: string;
  retirementIndex: string;
};

export const SingleRetirementPage: NextPage<Props> = (props) => {
  const { beneficiaryAddress, retirementIndex } = props;
  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title={t({
          id: "retirement.head.title",
          message: `Your retirement number ${retirementIndex} for address: ${beneficiaryAddress}`,
          values: { retirementIndex, beneficiaryAddress },
        })}
        mediaTitle={t({
          id: "retirement.head.title",
          message: `Your retirement number ${retirementIndex} for address: ${beneficiaryAddress}`,
          values: { retirementIndex, beneficiaryAddress },
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
            <Text align="center">
              tokenAddress: {props.retirementIndexInfo.tokenAddress}
            </Text>
            <Text align="center">
              amount: {props.retirementIndexInfo.amount}
            </Text>
            <Text align="center">
              beneficiaryName: {props.retirementIndexInfo.beneficiaryName}
            </Text>
            <Text align="center">
              message: {props.retirementIndexInfo.retirementMessage}
            </Text>
          </div>
        </div>
      </Section>
      <Footer />
    </>
  );
};
