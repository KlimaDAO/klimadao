import React, { FC } from "react";
import { Text } from "@klimadao/lib/components";
import { ButtonPrimary } from "@klimadao/lib/components";
import HelpIcon from "@mui/icons-material/Help";

import { CarbonProject } from "../../SelectiveRetirement/queryProjectDetails";
import { ProjectSearchStep } from "..";
import * as styles from "./styles";

type Props = {
  project: CarbonProject;
  setStep: (step: ProjectSearchStep) => void;
  setProjectAddress: (address: string) => void;
};

export const ConfirmProjectSelection: FC<Props> = (props) => (
  <div className={styles.confirmSelection}>
    <HelpIcon className={styles.icon} />
    <Text t="h5" align="center">
      Are you sure you want to select the following project:
    </Text>
    <Text t="body3" align="center">
      {props.project.name || props.project.projectID}
    </Text>

    <div className={styles.buttons}>
      <ButtonPrimary
        label="Confirm selection"
        onClick={() => {
          props.setProjectAddress(props.project.tokenAddress);
          props.setStep("confirmed");
        }}
      />
      <ButtonPrimary
        label="Back"
        onClick={() => props.setStep("selectProject")}
      />
    </div>
  </div>
);
