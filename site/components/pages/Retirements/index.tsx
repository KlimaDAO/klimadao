import { NextPage } from "next";
import { useRouter } from "next/router";
import { Text, Section } from "@klimadao/lib/components";
import { trimWithLocale } from "@klimadao/lib/utils";

import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { concatAddress } from "@klimadao/lib/utils";
import ContentCopy from "@mui/icons-material/ContentCopy";
import Check from "@mui/icons-material/Check";

import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { Breakdown } from "./Breakdown";
import { AllRetirements } from "./List";
import { RetirementFooter } from "./Footer";
import { CopyURLButton } from "./CopyURLButton";
import { useCopyToClipboard } from "hooks/useCopyToClipboard";

import { Trans, t } from "@lingui/macro";
import * as styles from "./styles";

type Props = {
  totalsAndBalances: RetirementsTotalsAndBalances;
  klimaRetires: KlimaRetire[];
  beneficiaryAddress: string;
  nameserviceDomain?: string;
  canonicalUrl?: string;
  fixedTheme: string; // ONLY FOR TESTING, REMOVE BEFORE MERGE
};

export const RetirementPage: NextPage<Props> = (props) => {
  const {
    beneficiaryAddress,
    totalsAndBalances,
    klimaRetires,
    nameserviceDomain,
    fixedTheme, // ONLY FOR TESTING, REMOVE BEFORE MERGE
  } = props;
  const { locale } = useRouter();
  const [copied, doCopy] = useCopyToClipboard();

  const concattedAddress = concatAddress(beneficiaryAddress);

  return (
    <>
      <PageHead
        title={t({
          id: "retirement.totals.head.title",
          message: `KlimaDAO - Carbon Retirements for beneficiary ${
            nameserviceDomain || concattedAddress
          }`,
        })}
        mediaTitle={t({
          id: "retirement.totals.head.metaTitle",
          message: `KlimaDAO - Carbon Retirements for beneficiary ${
            nameserviceDomain || concattedAddress
          }`,
        })}
        metaDescription={t({
          id: "shared.head.description",
          message:
            "Drive climate action and earn rewards with a carbon-backed digital currency.",
        })}
        canonicalUrl={props.canonicalUrl}
      />
      <Navigation activePage="Home" showThemeToggle={!fixedTheme} />

      <Section variant="gray" className={styles.section}>
        <div className={styles.pageHeadline}>
          <div className="textGroup">
            <Text t="h2" as="h2" align="center">
              <Trans id="retirement.totals.page_headline">
                Carbon Retirements
              </Trans>
            </Text>
            <Text align="center" className={styles.address}>
              <Trans id="retirement.totals.page_subline">for beneficiary</Trans>
              <button
                className={styles.copyButton}
                onClick={() => doCopy(nameserviceDomain || beneficiaryAddress)}
              >
                {nameserviceDomain || concattedAddress}
                {copied ? (
                  <Check fontSize="large" />
                ) : (
                  <ContentCopy fontSize="large" />
                )}
              </button>
            </Text>
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
              {trimWithLocale(totalsAndBalances.totalTonnesRetired, 2, locale)}t
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
              {totalsAndBalances.totalRetirements}
            </Text>
            <Text t="h4" color="lightest" align="center">
              <Trans id="retirement.totals.total_retirement_transactions">
                Total Retirement Transactions
              </Trans>
            </Text>
          </div>
        </div>
        <Breakdown totalsAndBalances={props.totalsAndBalances} />
        <AllRetirements
          klimaRetires={klimaRetires}
          nameserviceDomain={props.nameserviceDomain}
        />
      </Section>
      <Section variant="gray" className={styles.sectionButtons}>
        <div className={styles.sectionButtonsWrap}>
          <CopyURLButton />
        </div>
      </Section>
      <RetirementFooter />
      <Footer />
    </>
  );
};
