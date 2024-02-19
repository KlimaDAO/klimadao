import { GridContainer, Section } from "@klimadao/lib/components";
import { concatAddress, formatTonnes } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { Footer } from "components/Footer";
import { PageHead } from "components/PageHead";
import { SocialLinks } from "components/SocialLinks";
import { Text } from "components/Text";
import { Navigation } from "components/shared/Navigation";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { RetirementProvenancePageProps } from "pages/retirements/[beneficiary]/[retirement_index]/provenance";
import { ProvenanceComponent } from "./ProvenanceComponent";
import { RetirementCard } from "./RetirementCard";
import { splitProvenance } from "./RetirementProvenance.utils";
import * as styles from "./styles";

/**
 * Renders the carbon provenance page
 * @param props
 * @returns
 */
export const RetirementProvenancePage: NextPage<
  RetirementProvenancePageProps
> = (props) => {
  const { locale } = useRouter();

  const formattedAmount = formatTonnes({
    amount: String(props.retirement.amount),
    locale: locale || "en",
  });

  const retiree =
    props.retirement.beneficiaryAddress ||
    props.nameserviceDomain ||
    concatAddress(props.retirement.beneficiaryAddress);

  const provenanceList = splitProvenance(props.provenance);

  return (
    <GridContainer className={styles.pageWrapper}>
      <PageHead
        title={t({
          id: "retirement.provenance.head.title",
          message: `Carbonmark | Carbon Retirement provenance`,
        })}
        mediaTitle={t({
          id: "retirement.provenance.head.metaTitle",
          message: `${retiree} retired ${formattedAmount} Tonnes of carbon`,
        })}
        metaDescription={t({
          id: "retirement.provenance.head.metaDescription",
          message: "Transparent, on-chain offsets powered by Carbonmark.",
        })}
        canonicalUrl={props.canonicalUrl}
      />
      <Navigation activePage="Home" transparent={false} />
      <Section className={styles.section} variant="gray">
        <div className={styles.content}>
          <Text t="h1" align="center">
            <Trans>Carbon Provenance</Trans>
          </Text>
          <Text t="body1" align="center">
            <Trans>
              View the entire transaction history – from bridging event until
              retirement – for each credit and partial credit included in the
              following retirement transaction:
            </Trans>
          </Text>
          <RetirementCard
            retirement={props.retirement}
            beneficiaryAddress={props.beneficiaryAddress}
            retirementIndex={props.retirementIndex}
          />
          <div className={styles.social}>
            <Text t="body1">
              <Trans>Share this page</Trans>
            </Text>
            <SocialLinks
              twitterTags={["Carbonmark", "retirement"]}
              twitterTitle={`${retiree} retired ${formattedAmount} Tonnes of carbon`}
            ></SocialLinks>
          </div>
          {provenanceList.map((provenance, index) => (
            <ProvenanceComponent
              key={index}
              records={provenance}
              retirement={props.retirement}
            />
          ))}
        </div>
      </Section>
      <Footer />
    </GridContainer>
  );
};
