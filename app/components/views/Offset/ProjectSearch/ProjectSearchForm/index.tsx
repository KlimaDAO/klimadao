import React, { FC, useState } from "react";
import { ButtonPrimary } from "@klimadao/lib/components";
import isEmpty from "lodash/isEmpty";
import filter from "lodash/filter";

import {
  queryCarbonProjectDetails,
  CarbonProject,
} from "../../SelectiveRetirement/queryProjectDetails";
import { ProjectSearchFilter } from "../ProjectSearchFilter";

import { types, countries, vintages } from "../filterOptions";
import { ProjectSearchStep } from "../";

type Props = {
  setStep: (step: ProjectSearchStep) => void;
  setProjects: (projects: CarbonProject[]) => void;
  setIsLoading: (boolean: boolean) => void;
};

const stringifyQuery = (values: string[]) =>
  values
    .map((value) => {
      if (value.split(" ").length > 1) return `'${value}'`;
      return value;
    })
    .join(" | ");

export const ProjectSearchForm: FC<Props> = (props) => {
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);
  const [type, setType] = useState<string[]>([]);
  const [region, setRegion] = useState<string[]>([]);
  const [vintage, setVintage] = useState<string[]>([]);

  const createQuery = () => {
    const query = filter([type, region, vintage], (array) => !isEmpty(array));
    return query
      .map((queryAttribute) => `(${stringifyQuery(queryAttribute)})`)
      .join(" & ");
  };

  const handleSubmit = async () => {
    props.setIsLoading(true);
    const query = createQuery();
    const projects = await queryCarbonProjectDetails(query);
    console.log(projects)

    // setTimeout(() => {
    //   props.setStep("selectProject");
    //   props.setProjects(mockProjectDetails as any[]);
    props.setIsLoading(false);
    // }, 1500);
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
