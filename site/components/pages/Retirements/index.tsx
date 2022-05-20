import { NextPage } from "next";
import { Text, Section } from "@klimadao/lib/components";
import { trimStringDecimals } from "@klimadao/lib/utils";

import { Navigation } from "components/Navigation";
import { PageHead } from "components/PageHead";
import { Footer } from "components/Footer";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";
import { KlimaRetire } from "@klimadao/lib/types/subgraph";
import { concatAddress } from "@klimadao/lib/utils";

import ForestOutlinedIcon from "@mui/icons-material/ForestOutlined";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { Breakdown } from "./Breakdown";
import { AllRetirements } from "./List";
import { RetirementFooter } from "./Footer";
import { CopyURLButton } from "./CopyURLButton";

import { IS_PRODUCTION } from "lib/constants";
import { Trans, t } from "@lingui/macro";
import * as styles from "./styles";
import { urls } from "@klimadao/lib/constants";

type Props = {
  totalsAndBalances: RetirementsTotalsAndBalances;
  klimaRetires: KlimaRetire[];
  beneficiaryAddress: string;
};

export const RetirementPage: NextPage<Props> = (props) => {
  const { beneficiaryAddress, totalsAndBalances } = props;
  const concattedAddress = concatAddress(beneficiaryAddress);

  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title={t({
          id: "retirement.totals.head.title",
          message: `KlimaDAO - Carbon Retirements for beneficiary ${concattedAddress}`,
          values: { beneficiaryAddress },
        })}
        mediaTitle={t({
          id: "retirement.totals.head.metaTitle",
          message: `KlimaDAO - Carbon Retirements for beneficiary ${concattedAddress}`,
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
        <div className={styles.pageHeadline}>
          <div className="textGroup">
            <Text t="h2" as="h2" align="center">
              <Trans id="retirement.totals.page_headline">
                Carbon Retirements
              </Trans>
            </Text>
            <Text align="center">
              <Trans id="retirement.totals.page_subline">
                for beneficiary {concattedAddress}{" "}
              </Trans>
            </Text>
          </div>
        </div>
        <div className={styles.cards}>
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
          <div className={styles.card}>
            <Text t="h3" as="h3" align="center" className="headline">
              <ForestOutlinedIcon fontSize="inherit" />
              <Trans id="retirement.totals.retired_assets">
                Retired Assets
              </Trans>
            </Text>
            <Text t="h2" className="value" align="center">
              {trimStringDecimals(totalsAndBalances.totalTonnesRetired, 5)} t
            </Text>
            <Text t="h4" color="lightest" align="center">
              <Trans id="retirement.totals.total_carbon_tonnes">
                Total Carbon Tonnes Retired
              </Trans>
            </Text>
          </div>
        </div>
        <Breakdown totalsAndBalances={props.totalsAndBalances} />
        <AllRetirements klimaRetires={props.klimaRetires} />
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
