import React, { FC, useState } from "react";
import { Text } from "@klimadao/lib/components";
import { ButtonPrimary } from "@klimadao/lib/components";

import { ProjectSearchFilter } from "./ProjectSearchFilter";
import { SelectProjectButton } from "./SelectProjectButton";
import { ConfirmProjectSelection } from "./ConfirmProjectSelection";

import {
  types,
  countries,
  vintages,
  mockProjectDetails,
} from "./filterOptions";
import * as styles from "./styles";

type Props = {
  setIsLoading: (boolean: boolean) => void;
  setProjectAddress: (address: string) => void;
};

export const ProjectSearch: FC<Props> = (props) => {
  const [step, setStep] = useState("search");

  const [currentFilter, setCurrentFilter] = useState(null);
  const [type, setType] = useState(null);
  const [region, setRegion] = useState(null);
  const [vintage, setVintage] = useState(null);
  const [projects, setProjects] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleSubmit = () => {
    console.log([type, region, vintage]);
    props.setIsLoading(true);

    setTimeout(() => {
      setStep("selectProject");
      setProjects(mockProjectDetails);
      props.setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      {step === "search" && (
        <>
          <div>
            <ProjectSearchFilter
              name="type"
              options={types}
              isOpen={currentFilter === "type"}
              onClick={setCurrentFilter}
              onChange={setType}
            />
            <ProjectSearchFilter
              name="region"
              options={countries}
              isOpen={currentFilter === "region"}
              onClick={setCurrentFilter}
              onChange={setRegion}
            />
            <ProjectSearchFilter
              name="vintage"
              options={vintages}
              isOpen={currentFilter === "vintage"}
              onClick={setCurrentFilter}
              onChange={setVintage}
            />
          </div>

          <ButtonPrimary label="Find project" onClick={handleSubmit} />
        </>
      )}

      {step === "selectProject" && projects && (
        <div className={styles.selectProjectContainer}>
          <Text t="caption" color="lighter">
            Select a project to continue
          </Text>
          <div className={styles.projectList}>
            {projects.map((project, index) => (
              <SelectProjectButton
                key={index}
                project={project}
                setSelectedProject={setSelectedProject}
                selected={true}
                active={selectedProject?.tokenAddress === project.tokenAddress}
              />
            ))}
          </div>

          <div className={styles.projectActionButtons}>
            <ButtonPrimary
              label="Back to filters"
              onClick={() => setStep("search")}
            />
            <ButtonPrimary
              label="Select project"
              onClick={() => setStep("confirmProject")}
              disabled={!selectedProject}
            />
          </div>
        </div>
      )}

      {step === "confirmProject" && selectedProject && (
        <ConfirmProjectSelection
          setStep={setStep}
          projectName={selectedProject.name}
        />
      )}
    </>
  );
};
