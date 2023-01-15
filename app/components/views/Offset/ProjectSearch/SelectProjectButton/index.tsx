import { Anchor, Text } from "@klimadao/lib/components";
import { RetirementToken, verra } from "@klimadao/lib/constants";
import { trimWithLocale } from "@klimadao/lib/utils";
import { Trans } from "@lingui/macro";
import CheckIcon from "@mui/icons-material/Check";
import LaunchIcon from "@mui/icons-material/Launch";
import { FC } from "react";

import {
  BalanceAttribute,
  CarbonProject,
} from "../../SelectiveRetirement/queryProjectDetails";
import * as styles from "./styles";

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
      `balance${props.selectedRetirementToken.toUpperCase()}` as BalanceAttribute
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

      <Text t="body3">{props.project.name || props.project.projectID}</Text>

      <Text t="badge" className={styles.regionLabel}>
        {props.project.country || props.project.region}
      </Text>

      {props.selectedRetirementToken !== "mco2" && (
        <Text t="badge" className={styles.tonnageLabel}>
          <Trans id="offset.selectiveRetirement.project.available_tonnes">
            Available tonnes:{" "}
            {trimWithLocale(availableTonnes.toString(), 2, "en")}
          </Trans>
        </Text>
      )}

      <Anchor href={linkToProjectDetails()}>
        <Text t="badge" color="lightest" className={styles.projectDetailsLink}>
          Project details
          <LaunchIcon />
        </Text>
      </Anchor>
    </button>
  );
};
