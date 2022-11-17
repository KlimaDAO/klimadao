import React, { FC, useEffect, useState } from "react";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import isEmpty from "lodash/isEmpty";
import ErrorIcon from "@mui/icons-material/Error";

import { CarbonProject } from "../SelectiveRetirement/queryProjectDetails";
import { ProjectSearchForm } from "./ProjectSearchForm";
import { ProjectSelection } from "./ProjectSelection";
import { ConfirmProjectSelection } from "./ConfirmProjectSelection";
import { SelectProjectButton } from "./SelectProjectButton";

import * as styles from "./styles";

type Props = {
  projectAddress: string;
  selectedProject: CarbonProject | null;
  setIsLoading: (boolean: boolean) => void;
  setProjectAddress: (address: string) => void;
  setSelectedProject: (project: CarbonProject | null) => void;
};

export type ProjectSearchStep =
  | ""
  | "search"
  | "selectProject"
  | "confirmProject"
  | "confirmed";

export const ProjectSearch: FC<Props> = (props) => {
  const [step, setStep] = useState<ProjectSearchStep>("");
  const [projects, setProjects] = useState<CarbonProject[]>([]);

  // skip to confirmed step if project has been selected
  useEffect(() => {
    if (props.selectedProject && props.projectAddress) {
      return setStep("confirmed");
    }

    setStep("search");
  }, [props.projectAddress]);

  return (
    <>
      {step === "search" && (
        <ProjectSearchForm
          setStep={setStep}
          setProjects={setProjects}
          setIsLoading={props.setIsLoading}
        />
      )}

      {step === "selectProject" && !isEmpty(projects) && (
        <ProjectSelection
          projects={projects}
          selectedProject={props.selectedProject}
          setProjects={setProjects}
          setSelectedProject={props.setSelectedProject}
          setStep={setStep}
        />
      )}

      {step === "selectProject" && isEmpty(projects) && (
        <>
          <div className={styles.noResultsContainer}>
            <ErrorIcon />
            <Text t="body8" align="center">
              We could not find any projects releated to your search. Please
              modify the filters and try again.
            </Text>
          </div>

          <ButtonPrimary
            label="Back to filters"
            onClick={() => setStep("search")}
          />
        </>
      )}

      {step === "confirmProject" && props.selectedProject && (
        <ConfirmProjectSelection
          project={props.selectedProject}
          setStep={setStep}
          setProjectAddress={props.setProjectAddress}
        />
      )}

      {step === "confirmed" && props.selectedProject && (
        <>
          <SelectProjectButton active={true} project={props.selectedProject} />
          <ButtonPrimary
            label="Clear selection"
            variant="gray"
            onClick={() => {
              props.setProjectAddress("");
              props.setSelectedProject(null);
              setStep("search");
            }}
          />
        </>
      )}
    </>
  );
};
