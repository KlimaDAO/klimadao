import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { Trans, t } from "@lingui/macro";
import HelpIcon from "@mui/icons-material/Help";
import { FC } from "react";

import { ProjectSearchStep } from "..";
import { CarbonProject } from "../../SelectiveRetirement/queryProjectDetails";
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
      <Trans id="offset.selectiveRetirement.confirmation_message">
        Are you sure you want to select the following project:
      </Trans>
    </Text>
    <Text t="body3" align="center">
      {props.project.name || props.project.projectID}
    </Text>

    <div className={styles.buttons}>
      <ButtonPrimary
        label={t({
          id: "offset.selectiveRetirement.confirm_selection",
          message: "Confirm selection",
        })}
        onClick={() => {
          props.setProjectAddress(props.project.tokenAddress);
          props.setStep("confirmed");
        }}
      />
      <ButtonPrimary
        label={t({ id: "shared.back", message: "Back" })}
        onClick={() => props.setStep("selectProject")}
      />
    </div>
  </div>
);
