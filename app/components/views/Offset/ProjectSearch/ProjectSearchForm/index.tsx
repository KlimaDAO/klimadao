import React, { FC, useState } from "react";
import { ButtonPrimary } from "@klimadao/lib/components";

import { CarbonProject } from "../../SelectiveRetirement/queryProjectDetails";
import { ProjectSearchFilter } from "../ProjectSearchFilter";

import {
  types,
  countries,
  vintages,
  mockProjectDetails,
} from "../filterOptions";
import { ProjectSearchSteps } from "../";

type Props = {
  setStep: (step: ProjectSearchSteps) => void;
  setProjects: (projects: CarbonProject[]) => void;
  setIsLoading: (boolean: boolean) => void;
};

export const ProjectSearchForm: FC<Props> = (props) => {
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);
  const [type, setType] = useState<string[]>([]);
  const [region, setRegion] = useState<string[]>([]);
  const [vintage, setVintage] = useState<string[]>([]);

  // TODO - serialize query params
  const handleSubmit = () => {
    console.log([type, region, vintage]);
    props.setIsLoading(true);

    setTimeout(() => {
      props.setStep("selectProject");
      props.setProjects(mockProjectDetails as any[]);
      props.setIsLoading(false);
    }, 1500);
  };

  return (
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
  );
};
