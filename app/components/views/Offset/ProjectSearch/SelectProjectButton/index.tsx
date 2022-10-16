import React, { FC } from "react";
import { Text } from "@klimadao/lib/components";
import CheckIcon from "@mui/icons-material/Check";

import * as styles from "./styles";

type Props = {
  active: boolean;
  setSelectedProject: (project: string) => void;
};

export const SelectProjectButton: FC<Props> = (props) => (
  <button
    className={styles.selectProjectButton}
    onClick={() => props.setSelectedProject(props.tokenAddress)}
    data-active={props.active}
  >
    <div className={styles.header}>
      <Text t="caption">{props.methodologyCategory}</Text>
      <div className={styles.checkedIcon} data-active={props.active}>
        <CheckIcon />
      </div>
    </div>

    <Text t="body4">{props.name} →</Text>

    <Text t="badge" className={styles.regionLabel}>
      {props.region}
    </Text>

    <Text t="badge">Available tonnes: {props.currentSupply}</Text>
  </button>
);
