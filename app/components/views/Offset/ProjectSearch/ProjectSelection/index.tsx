import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { RetirementToken } from "@klimadao/lib/constants";
import { Trans, t } from "@lingui/macro";
import { FC } from "react";

import { CarbonProject } from "../../SelectiveRetirement/queryProjectDetails";
import { SelectProjectButton } from "../SelectProjectButton";

import { ProjectSearchStep } from "../";
import * as styles from "./styles";

type Props = {
  projects: CarbonProject[];
  selectedProject: CarbonProject | null;
  selectedRetirementToken: RetirementToken;
  setProjects: (projects: CarbonProject[]) => void;
  setSelectedProject: (project: CarbonProject) => void;
  setStep: (step: ProjectSearchStep) => void;
};

export const ProjectSelection: FC<Props> = (props) => (
  <div className={styles.selectProjectContainer}>
    <Text t="caption" color="lighter">
      <Trans id="offset.selectiveRetirement.selectProject.label">
        Select a project to continue:
      </Trans>
    </Text>

    <div className={styles.projectList}>
      {props.projects.map((project, index) => (
        <SelectProjectButton
          key={index}
          project={project}
          setSelectedProject={props.setSelectedProject}
          selectedRetirementToken={props.selectedRetirementToken}
          active={props.selectedProject?.tokenAddress === project.tokenAddress}
        />
      ))}
    </div>

    <div className={styles.projectActionButtons}>
      <ButtonPrimary
        label={t({
          id: "offset.selectiveRetirement.selectProject.back",
          message: "Back to filters",
        })}
        onClick={() => props.setStep("search")}
      />
      <ButtonPrimary
        label={t({
          id: "offset.selectiveRetirement.selectProject.select",
          message: "Select project",
        })}
        onClick={() => props.setStep("confirmProject")}
        disabled={!props.selectedProject}
      />
    </div>
  </div>
);
