import { GridContainer, Section } from "@klimadao/lib/components";
import {
  concatAddress,
  formatTonnes,
  queryKlimaRetireByIndex,
  safeSub
} from "@klimadao/lib/utils";
import { t } from "@lingui/macro";
import { Footer } from "components/Footer";
import { PageHead } from "components/PageHead";
import { Navigation } from "components/shared/Navigation";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { RetirementProvenancePageProps } from "pages/retirements/[beneficiary]/[retirement_index]/provenance";
import { useEffect } from "react";
import { ProvenanceRenderer } from "./ProvenanceRenderer";
import * as styles from "./styles";

export const RetirementProvenancePage: NextPage<RetirementProvenancePageProps> = ({
  retirement, // destructure so ts can properly narrow retirement.pending types
  ...props
}) => {
  const { locale } = useRouter();

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
        Number(safeSub(props.retirementIndex, "1")) // totals does not include index 0
      );
      if (result) {
        return window.location.reload();
      }
      // otherwise wait 5 more seconds and try again
      await rescursivePoller();
    };
    rescursivePoller();
  }, []);

  return (
    <GridContainer>
      <PageHead
        title={t({
          id: "retirement.head.title",
          message: `Carbonmark | Carbon Retirement provenance`,
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
      <Navigation activePage="Home" transparent={true}/>
      <Section className={styles.section}>
        <div>
        <ProvenanceRenderer records={props.provenance}/>
     
        </div>
      </Section>
      <Footer />
    </GridContainer>
  );
};
