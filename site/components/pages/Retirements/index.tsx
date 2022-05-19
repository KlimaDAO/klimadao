import { NextPage } from "next";
import Image from "next/image";
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
import CloudQueueIcon from "@mui/icons-material/CloudQueue";

import { AllRetirements } from "./List";
import { RetirementFooter } from "./Footer";
import { CopyURLButton } from "./CopyURLButton";
import { allRetirementTokenInfos } from "../../../lib/getTokenInfo";

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
  const breakdownTokens = allRetirementTokenInfos;

  return (
    <>
      <PageHead
        production={IS_PRODUCTION}
        title={t({
          id: "retirement.totals.head.title",
          message: `KlimaDao - Carbon Retirements for beneficiary ${concattedAddress}`,
          values: { beneficiaryAddress },
        })}
        mediaTitle={t({
          id: "retirement.totals.head.metaTitle",
          message: `KlimaDao - Carbon Retirements for beneficiary ${concattedAddress}`,
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
            <Trans id="retirement.totals.page_headline">
              <Text t="h2" as="h2" align="center">
                Carbon Retirements
              </Text>
            </Trans>
            <Trans id="retirement.totals.page_subline">
              <Text align="center">for beneficiary {concattedAddress}</Text>
            </Trans>
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
            <Trans id="retirement.totals.number_of_total_retirements">
              <Text t="h4" color="lightest" align="center">
                Number of Total Retirements
              </Text>
            </Trans>
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
            <Trans id="retirement.totals.total_carbon_tonnes">
              <Text t="h4" color="lightest" align="center">
                Total Carbon Tonnes Retired
              </Text>
            </Trans>
          </div>
        </div>
        <div className={styles.breakdown}>
          <div className={styles.breakdownHeadline}>
            <Trans id="retirement.totals.breakdown_headline">
              <Text t="h3" as="h3" align="center" className="title">
                <CloudQueueIcon fontSize="inherit" />
                Breakdown
              </Text>
            </Trans>
            <Trans id="retirement.totals.breakdown_subline">
              <Text t="h4" color="lightest" align="center">
                Tokens used for retirements
              </Text>
            </Trans>
          </div>
          <div className={styles.breakdownList}>
            {breakdownTokens.map((tkn, index) => (
              <div className={styles.breakdownListItem} key={`${tkn}-${index}`}>
                <Image src={tkn.icon} width={48} height={48} alt="" />
                <div className="content">
                  <Text>
                    {totalsAndBalances[
                      tkn.key as keyof RetirementsTotalsAndBalances
                    ] || 0}
                  </Text>
                  <Text color="lightest">{tkn.label}</Text>
                </div>
              </div>
            ))}
          </div>
        </div>
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
