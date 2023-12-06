import { GridContainer, Section, Text } from "@klimadao/lib/components";
import { concatAddress, formatTonnes } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import { Footer } from "components/Footer";
import { PageHead } from "components/PageHead";
import { SocialLinks } from "components/SocialLinks";
import { Navigation } from "components/shared/Navigation";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { RetirementProvenancePageProps } from "pages/retirements/[beneficiary]/[retirement_index]/provenance";
import { Provenance } from "./Provenance";
import * as styles from "./styles";

export const RetirementProvenancePage: NextPage<
  RetirementProvenancePageProps
> = ({
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
      <Navigation activePage="Home" transparent={false} />
      <Section className={styles.section} variant="gray">
        <div className={styles.content}>
          <Text t="h1">
            <Trans>Carbon provenance</Trans>
          </Text>
          <Text t="body1">
            <Trans>
              View the entire transaction history - from bridging event until
              retirement - for each credit and partial credit included in the
              following retirement transaction:
            </Trans>
          </Text>
          <div className={styles.social}>
            <Text t="body1">
              <Trans>Share this page</Trans>
            </Text>
            <SocialLinks
              twitterTags={["Carbonmark", "retirement"]}
              twitterTitle={`${retiree} retired ${formattedAmount} Tonnes of carbon`}
            ></SocialLinks>
          </div>

          <Provenance
            records={props.provenance}
            retirementId={retirement.offset.id}
          />
        </div>
      </Section>
      <Footer />
    </GridContainer>
  );
};
