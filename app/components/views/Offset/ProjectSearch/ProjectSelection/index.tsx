import React, { FC } from "react";
import { Text } from "@klimadao/lib/components";
import { ButtonPrimary } from "@klimadao/lib/components";

import { CarbonProject } from "../../SelectiveRetirement/queryProjectDetails";
import { SelectProjectButton } from "../SelectProjectButton";
import * as styles from "./styles";

type Props = {
  projects: CarbonProject[];
  selectedProject: CarbonProject | null;
  setProjects: (projects: CarbonProject[]) => void;
  setSelectedProject: (project: CarbonProject) => void;
  setStep: (step: string) => void;
};

export const ProjectSelection: FC<Props> = (props) => (
  <div className={styles.selectProjectContainer}>
    <Text t="caption" color="lighter">
      Select a project to continue:
    </Text>
    <div className={styles.projectList}>
      {props.projects.map((project, index) => (
        <SelectProjectButton
          key={index}
          project={project}
          setSelectedProject={props.setSelectedProject}
          active={props.selectedProject?.tokenAddress === project.tokenAddress}
        />
      ))}
    </div>

    <div className={styles.projectActionButtons}>
      <ButtonPrimary
        label="Back to filters"
        onClick={() => props.setStep("search")}
      />
      <ButtonPrimary
        label="Select project"
        onClick={() => props.setStep("confirmProject")}
        disabled={!props.selectedProject}
      />
    </div>
  </div>
);
