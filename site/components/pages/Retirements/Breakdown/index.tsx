import { NextPage } from "next";
import Image from "next/image";
import { Text } from "@klimadao/lib/components";

import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";

import CloudQueueIcon from "@mui/icons-material/CloudQueue";

import { allRetirementTokenInfos } from "lib/getTokenInfo";

import { Trans } from "@lingui/macro";
import * as styles from "./styles";

type Props = {
  totalsAndBalances: RetirementsTotalsAndBalances;
};

export const Breakdown: NextPage<Props> = (props) => {
  const { totalsAndBalances } = props;

  const breakdownTokens = allRetirementTokenInfos
    .map((tkn) => ({
      ...tkn,
      amount:
        totalsAndBalances[tkn.key as keyof RetirementsTotalsAndBalances] || "0",
    }))
    .sort((a, b) => Number(b.amount) - Number(a.amount));

  return (
    <div className={styles.breakdown}>
      <div className={styles.breakdownHeadline}>
        <Text t="h3" as="h3" align="center" className="title">
          <CloudQueueIcon fontSize="inherit" />
          <Trans id="retirement.totals.breakdown_headline">Breakdown</Trans>
        </Text>
        <Text t="h4" color="lightest" align="center">
          <Trans id="retirement.totals.breakdown_subline">
            Tokens used for retirements
          </Trans>
        </Text>
      </div>
      <div className={styles.breakdownList}>
        {breakdownTokens.map((tkn, index) => {
          const amount =
            Number(tkn.amount) > 0 ? (
              <Text>{tkn.amount}</Text>
            ) : (
              <Text color="lightest" t="caption">
                <Trans id="retirement.totals.breakdown.no_retirement_found">
                  No retirements found
                </Trans>
              </Text>
            );
          return (
            <div className={styles.breakdownListItem} key={`${tkn}-${index}`}>
              <Image
                src={tkn.icon}
                width={48}
                height={48}
                alt={`${tkn.label}-icon`}
              />
              <div className="content">
                {amount}
                <Text color="lightest">{tkn.label}</Text>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
