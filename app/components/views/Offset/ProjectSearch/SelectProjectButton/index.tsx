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
    onClick={() => {
      console.log(props.project);
      props.setSelectedProject(props.project);
    }}
    data-active={props.active}
  >
    <div className={styles.header}>
      <Text t="caption">{props.project.methodologyCategory}</Text>
      <div className={styles.checkedIcon} data-active={props.active}>
        <CheckIcon />
      </div>
    </div>

    <Text t="body4">{props.project.name} →</Text>

    <Text t="badge" className={styles.regionLabel}>
      {props.project.region}
    </Text>

    <Text t="badge">Available tonnes: {props.project.currentSupply}</Text>
  </button>
);
