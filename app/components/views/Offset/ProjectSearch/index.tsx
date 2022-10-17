import React, { FC, useState } from "react";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import isEmpty from "lodash/isEmpty";

import ErrorIcon from "@mui/icons-material/Error";

import { CarbonProject } from "../SelectiveRetirement/queryProjectDetails";
import { ProjectSearchForm } from "./ProjectSearchForm";
import { ProjectSelection } from "./ProjectSelection";
import { ConfirmProjectSelection } from "./ConfirmProjectSelection";

import * as styles from "./styles";

type Props = {
  setIsLoading: (boolean: boolean) => void;
  setProjectAddress: (address: string) => void;
};

export const ProjectSearch: FC<Props> = (props) => {
  const [step, setStep] = useState("search");
  const [projects, setProjects] = useState<CarbonProject[]>([]);
  const [selectedProject, setSelectedProject] = useState<CarbonProject | null>(
    null
  );

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
          selectedProject={selectedProject}
          setProjects={setProjects}
          setSelectedProject={setSelectedProject}
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

      {step === "confirmProject" && selectedProject && (
        <ConfirmProjectSelection
          projectName={selectedProject.name}
          projectAddress={selectedProject.tokenAddress}
          setStep={setStep}
          setProjectAddress={props.setProjectAddress}
        />
      )}

      {/* {step === "selected" && selectedProject && <ProjectDetailCard />} */}
    </>
  );
};
