import React, { FC } from "react";
import { Anchor, Text } from "@klimadao/lib/components";
import { RetirementToken } from "@klimadao/lib/constants";
import { trimWithLocale } from "@klimadao/lib/utils";
import CheckIcon from "@mui/icons-material/Check";
import { verra } from "@klimadao/lib/constants";

import { CarbonProject } from "../../SelectiveRetirement/queryProjectDetails";
import * as styles from "./styles";

type Foobar = "balanceBCT" | "balanceNCT" | "balanceUBO" | "balanceNBO";

type Props = {
  active: boolean;
  project: CarbonProject;
  selectedRetirementToken: RetirementToken;
  setSelectedProject?: (project: CarbonProject) => void;
};

export const SelectProjectButton: FC<Props> = (props) => {
  /**
   * Assumes following data format from respective bridges
   *   Toucan:
   *     projectID = "VCS-123"
   *   C3:
   *     projectID = "123"
   */
  const linkToProjectDetails = () => {
    if (props.project.bridge === "C3") {
      return `${verra.projectDetailPage}/${props.project.projectID}`;
    }

    if (props.project.bridge === "Toucan") {
      const projectId = props.project.projectID.replace("VCS-", "");
      return `${verra.projectDetailPage}/${projectId}`;
    }

    return "#";
  };

  const availableTonnes =
    props.project[
      `balance${props.selectedRetirementToken.toUpperCase()}` as Foobar
    ];

  return (
    <button
      className={styles.selectProjectButton}
      onClick={() => props.setSelectedProject?.(props.project)}
      data-active={props.active}
    >
      <div className={styles.header}>
        <Text t="caption">{props.project.methodologyCategory}</Text>
        <div className={styles.checkedIcon} data-active={props.active}>
          <CheckIcon />
        </div>
      </div>

      <Anchor href={linkToProjectDetails()}>
        <Text t="body4">{props.project.name || props.project.projectID} →</Text>
      </Anchor>

      <Text t="badge" className={styles.regionLabel}>
        {props.project.country || props.project.region}
      </Text>

      <Text t="badge">
        Available tonnes: {trimWithLocale(availableTonnes.toString(), 2, "en")}
      </Text>
    </button>
  );
};
