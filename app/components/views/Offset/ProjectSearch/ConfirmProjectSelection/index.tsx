import React, { FC } from "react";
import { Text } from "@klimadao/lib/components";
import { ButtonPrimary } from "@klimadao/lib/components";
import HelpIcon from "@mui/icons-material/Help";

import * as styles from "./styles";

type Props = {
  projectName: string;
  projectAddress: string;
  setStep: (step: string) => void;
  setProjectAddress: (address: string) => void;
};

export const ConfirmProjectSelection: FC<Props> = (props) => (
  <div className={styles.confirmSelection}>
    <HelpIcon className={styles.icon} />
    <Text t="h5" align="center">
      Are you sure you want to select the following project:
    </Text>
    <Text t="body6" align="center">
      {props.projectName}
    </Text>

    <div className={styles.buttons}>
      <ButtonPrimary
        label="Confirm selection"
        onClick={() => props.setProjectAddress(props.projectAddress)}
      />
      <ButtonPrimary
        label="Back"
        onClick={() => props.setStep("selectProject")}
      />
    </div>
  </div>
);
