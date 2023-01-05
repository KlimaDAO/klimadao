import { Text } from "@klimadao/lib/components";
import { RetirementsTotalsAndBalances } from "@klimadao/lib/types/offset";
import { trimWithLocale } from "@klimadao/lib/utils";
import { allRetirementTokenInfos } from "lib/getTokenInfo";
import { NextPage } from "next";
import Image from "next/legacy/image";
import { useRouter } from "next/router";

import { Trans } from "@lingui/macro";
import * as styles from "./styles";

type Props = {
  totalsAndBalances: RetirementsTotalsAndBalances;
};

export const Breakdown: NextPage<Props> = (props) => {
  const { totalsAndBalances } = props;
  const { locale } = useRouter();
  const breakdownTokens = allRetirementTokenInfos
    .map((tkn) => ({
      ...tkn,
      amount:
        totalsAndBalances[tkn.key as keyof RetirementsTotalsAndBalances] || "0",
    }))
    .sort((a, b) => Number(b.amount) - Number(a.amount))
    .filter((tkn) => Number(tkn.amount) > 0);

  return (
    <div className={styles.breakdown}>
      <div className={styles.breakdownHeadline}>
        <Text t="h3" as="h3" align="center" className="title">
          <Trans id="retirement.totals_by_assets.headline">
            Retirement Totals By Asset
          </Trans>
        </Text>
      </div>
      <div className={styles.breakdownList}>
        {!!breakdownTokens.length &&
          breakdownTokens.map((tkn, index) => {
            return (
              <div className={styles.breakdownListItem} key={`${tkn}-${index}`}>
                <Image
                  src={tkn.icon}
                  width={48}
                  height={48}
                  alt={`${tkn.label}-icon`}
                />
                <div className="content">
                  <Text>{trimWithLocale(tkn.amount, 5, locale)}</Text>
                  <Text color="lightest">{tkn.label}</Text>
                </div>
              </div>
            );
          })}
        {!breakdownTokens.length && (
          <Text align="center">
            <Trans id="retirement.totals.breakdown_token_assets.empty">
              No retirement assets found
            </Trans>
          </Text>
        )}
      </div>
    </div>
  );
};
