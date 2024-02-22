import {
  CopyValueButton,
  GridContainer,
  Section,
  Text,
} from "@klimadao/lib/components";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { concatAddress, trimWithLocale } from "@klimadao/lib/utils";
import { Trans, t } from "@lingui/macro";
import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { Footer } from "components/Footer";
import { PageHead } from "components/PageHead";
import { Navigation } from "components/shared/Navigation";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { RetirementFooter } from "./Footer";
import { AllRetirements } from "./List";
import * as styles from "./styles";

export type Props = {
  totalRetirements: number;
  totalCarbonRetired: string;
  klimaRetires: KlimaRetire[] | null;
  beneficiaryAddress: string;
  nameserviceDomain: string | null;
  canonicalUrl: string | null;
};

export const RetirementPage: NextPage<Props> = (props) => {
  const { beneficiaryAddress, klimaRetires, nameserviceDomain } = props;

  const { locale } = useRouter();
  const concattedAddress = concatAddress(beneficiaryAddress);

  return (
    <GridContainer className={styles.pageWrapper}>
      <PageHead
        title={t({
          id: "retirement.totals.head.title",
          message: `Carbonmark - Carbon Retirements for beneficiary ${
            nameserviceDomain || concattedAddress
          }`,
        })}
        mediaTitle={t({
          id: "retirement.totals.head.metaTitle",
          message: `Carbonmark - Carbon Retirements for beneficiary ${
            nameserviceDomain || concattedAddress
          }`,
        })}
        metaDescription={t`Drive climate action and earn rewards with a carbon-backed digital currency.`}
        canonicalUrl={props.canonicalUrl || undefined}
      />
      <Navigation activePage="Home" />

      <Section variant="gray" className={styles.section}>
        <div className={styles.pageHeader}>
          <div className={styles.headline}>
            <Text t="h2" as="h2" align="center">
              <Trans id="retirement.totals.page_headline">
                Carbon Retirements
              </Trans>
            </Text>
            <div className={styles.subline}>
              <Text align="center" className={styles.address}>
                <Trans id="retirement.totals.page_subline">
                  for beneficiary
                </Trans>
                <CopyValueButton
                  value={nameserviceDomain || beneficiaryAddress}
                  label={nameserviceDomain || concattedAddress}
                  className={styles.largeCopyButton}
                />
              </Text>
              {nameserviceDomain && (
                <Text align="center" className={styles.address}>
                  <CopyValueButton
                    value={beneficiaryAddress}
                    label={concattedAddress}
                  />
                </Text>
              )}
            </div>
          </div>
        </div>
        <div className={styles.cards}>
          <div className={styles.card}>
            <Text t="h3" as="h3" align="center" className="headline">
              <ForestOutlinedIcon fontSize="inherit" />
              <Trans id="retirement.totals.retired_assets">
                Retired Assets
              </Trans>
            </Text>
            <Text t="h2" className="value" align="center">
              {trimWithLocale(props.totalCarbonRetired, 2, locale)}t
            </Text>
            <Text t="h4" color="lightest" align="center">
              <Trans id="retirement.totals.total_carbon_tonnes">
                Total Carbon Tonnes Retired
              </Trans>
            </Text>
          </div>
          <div className={styles.card}>
            <Text t="h3" as="h3" align="center" className="headline">
              <LocalFireDepartmentIcon fontSize="inherit" />
              <Trans id="retirement.totals.retirements">Retirements</Trans>
            </Text>
            <Text t="h2" className="value" align="center">
              {props.totalRetirements}
            </Text>
            <Text t="h4" color="lightest" align="center">
              <Trans id="retirement.totals.total_retirement_transactions">
                Total Retirement Transactions
              </Trans>
            </Text>
          </div>
        </div>
        {klimaRetires && (
          <AllRetirements
            klimaRetires={klimaRetires}
            nameserviceDomain={props.nameserviceDomain || undefined}
          />
        )}
      </Section>
      <Section variant="gray" className={styles.sectionButtons}>
        <div className={styles.sectionButtonsWrap}>
          <CopyValueButton label="Copy Link" variant="lightGray" />
        </div>
      </Section>
      <Section variant="gray" className={styles.section}>
        <RetirementFooter />
      </Section>
      <Section variant="gray" className={styles.section} />
      <Footer />
    </GridContainer>
  );
};
