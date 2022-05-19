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
        <Trans id="retirement.totals.all_retirements_list.headline">
          <Text t="h3" as="h3" align="center" className="title">
            <NaturePeopleIcon fontSize="inherit" />
            All Retirements
          </Text>
        </Trans>
        <Trans id="retirement.totals.all_retirements_list.subline">
          <Text t="h4" color="lightest" align="center">
            List of single retirements
          </Text>
        </Trans>
      </div>
      <div className={styles.allRetirementsList}>
        {klimaRetires.map((retirement, index) => (
          <RetirementItem
            retirement={retirement}
            key={`${retirement}-${index}`}
          />
        ))}
      </div>
    </div>
  );
};
