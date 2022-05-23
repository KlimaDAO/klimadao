import { FC } from "react";

import { Text } from "@klimadao/lib/components";

import { KlimaRetire } from "@klimadao/lib/types/subgraph";

import { RetirementItem } from "./Item";
import NaturePeopleIcon from "@mui/icons-material/NaturePeopleOutlined";

import { Trans } from "@lingui/macro";
import * as styles from "./styles";

type Props = {
  klimaRetires: KlimaRetire[];
};

export const AllRetirements: FC<Props> = (props) => {
  const { klimaRetires } = props;

  return (
    <div className={styles.allRetirements}>
      <div className={styles.allRetirementsHeadline}>
        <Text t="h3" as="h3" align="center" className="title">
          <NaturePeopleIcon fontSize="inherit" />
          <Trans id="retirement.totals.all_retirements_list.headline">
            All Retirements
          </Trans>
        </Text>
        <Text t="h4" color="lightest" align="center">
          <Trans id="retirement.totals.all_retirements_list.subline">
            List of single retirements
          </Trans>
        </Text>
      </div>
      <div className={styles.allRetirementsList}>
        {!!klimaRetires.length &&
          klimaRetires.map((retirement, index) => (
            <RetirementItem
              retirement={retirement}
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
