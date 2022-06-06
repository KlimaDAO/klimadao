import { FC } from "react";

import { Text } from "@klimadao/lib/components";

import { KlimaRetire } from "@klimadao/lib/types/subgraph";

import { RetirementItem } from "./Item";

import { Trans } from "@lingui/macro";
import * as styles from "./styles";

type Props = {
  klimaRetires: KlimaRetire[];
  domain?: string;
};

export const AllRetirements: FC<Props> = (props) => {
  const { klimaRetires, domain } = props;

  return (
    <div className={styles.allRetirements}>
      <div className={styles.allRetirementsHeadline}>
        <Text t="h3" as="h3" align="center" className="title">
          <Trans id="retirement.totals.all_retirements_list.headline">
            All Retirements
          </Trans>
        </Text>
      </div>
      <div className={styles.allRetirementsList}>
        {!!klimaRetires.length &&
          klimaRetires.map((retirement, index) => (
            <RetirementItem
              retirement={retirement}
              domain={domain}
              key={`${retirement}-${index}`}
            />
          ))}
        {!klimaRetires.length && (
          <Text align="center">
            <Trans id="retirement.totals.all_retirements_list.empty">
              No retirements found
            </Trans>
          </Text>
        )}
      </div>
    </div>
  );
};
