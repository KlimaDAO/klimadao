import React, { FC, useState } from "react";

import { CarbonProject } from "../SelectiveRetirement/queryProjectDetails";
import { ProjectSearchForm } from "./ProjectSearchForm";
import { ProjectSelection } from "./ProjectSelection";
import { ConfirmProjectSelection } from "./ConfirmProjectSelection";

type Props = {
  setIsLoading: (boolean: boolean) => void;
  setProjectAddress: (address: string) => void;
};

export const ProjectSearch: FC<Props> = (props) => {
  const [step, setStep] = useState("search");
  const [projects, setProjects] = useState<CarbonProject[] | null>(null);
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

      {step === "selectProject" && projects && (
        <ProjectSelection
          projects={projects}
          selectedProject={selectedProject}
          setProjects={setProjects}
          setSelectedProject={setSelectedProject}
          setStep={setStep}
        />
      )}

      {step === "confirmProject" && selectedProject && (
        <ConfirmProjectSelection
          projectName={selectedProject.name}
          projectAddress={selectedProject.tokenAddress}
          setStep={setStep}
          setProjectAddress={props.setProjectAddress}
        />
      )}
    </>
  );
};
