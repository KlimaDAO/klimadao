import { NextPage } from "next";

import { Text, Section } from "@klimadao/lib/components";

import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { RetirementFooter } from "./Footer";

import { IS_PRODUCTION } from "lib/constants";
import { t } from "@lingui/macro";
import * as styles from "./styles";
import { urls } from "@klimadao/lib/constants";

type Props = {
  totalsAndBalances: RetirementsTotalsAndBalances;
  klimaRetires: KlimaRetire[];
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
          id: "retirement.totals.head.metaTitle",
          message: `KlimaDao - Your total retirements for address: ${beneficiaryAddress}`,
          values: { beneficiaryAddress },
        })}
        metaDescription={t({
          id: "shared.head.description",
          message:
            "Drive climate action and earn rewards with a carbon-backed digital currency.",
        })}
        mediaImageSrc={urls.mediaImage}
      />
      <Navigation activePage="Home" />

      <Section variant="gray" className={styles.section}>
        <div className={styles.retirementContent}>
          <div className={styles.retirement_textGroup}>
            <Text t="h2" as="h2" align="center">
              Retirements Total
            </Text>
            <Text align="center">
              beneficiaryAddress: {props.beneficiaryAddress}
            </Text>
            <Text align="center">
              You've got {props.totalsAndBalances.totalRetirements} Total
              retirements
            </Text>
            <Text align="center">
              You've retired {props.totalsAndBalances.totalTonnesRetired} tonnes
              of carbon
            </Text>
            <Text align="center">
              You've got
              {props.totalsAndBalances.totalTonnesClaimedForNFTS} Total tonnes
              claimed for NFTs
            </Text>
          </div>
        </div>
      </Section>
      <RetirementFooter />
      <Footer />
    </>
  );
};
