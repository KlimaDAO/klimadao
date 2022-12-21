import React, { FC, useState } from "react";
import { t } from "@lingui/macro";
import { ButtonPrimary } from "@klimadao/lib/components";
import { RetirementToken } from "@klimadao/lib/constants";
import isEmpty from "lodash/isEmpty";
import filter from "lodash/filter";

import {
  BalanceAttribute,
  CarbonProject,
  queryCarbonProjectDetails,
} from "../../SelectiveRetirement/queryProjectDetails";
import { ProjectSearchFilter } from "../ProjectSearchFilter";
import * as filterOptions from "../filterOptions";
import { ProjectSearchStep } from "../";

type Props = {
  setStep: (step: ProjectSearchStep) => void;
  setProjects: (projects: CarbonProject[]) => void;
  setIsLoading: (boolean: boolean) => void;
  selectedRetirementToken: RetirementToken;
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

  // https://thegraph.com/docs/en/querying/graphql-api/#fulltext-search-queries
  const createQuery = () => {
    const query = filter([type, region, vintage], (array) => !isEmpty(array));
    return query
      .map((queryAttribute) => `(${stringifyQuery(queryAttribute)})`)
      .join(" & ");
  };

  const filterProjectsByTokenPool = (
    projects: CarbonProject[]
  ): CarbonProject[] => {
    if (props.selectedRetirementToken === "mco2") return [];

    const selectedRetirementToken = props.selectedRetirementToken.toUpperCase();
    return filter(
      projects,
      (project) =>
        Number(
          project[`balance${selectedRetirementToken}` as BalanceAttribute]
        ) > 1
    );
  };

  const handleSubmit = async () => {
    try {
      props.setIsLoading(true);
      const query = createQuery();
      const projects = await queryCarbonProjectDetails(query);

      props.setProjects(filterProjectsByTokenPool(projects));
      props.setStep("selectProject");
      props.setIsLoading(false);
    } catch (error) {
      // should render an unable to search state
      // rendering no results component for now
      props.setStep("selectProject");
      props.setProjects([]);
      props.setIsLoading(false);
    }
  };

  return (
    <>
      <div>
        <ProjectSearchFilter
          name={t({
            id: "offset.selectiveRetirement.filters.type",
            message: "type",
          })}
          options={filterOptions.types}
          isOpen={currentFilter === "type"}
          onClick={setCurrentFilter}
          onChange={setType}
        />
        <ProjectSearchFilter
          name={t({
            id: "offset.selectiveRetirement.filters.region",
            message: "region",
          })}
          options={filterOptions.regions}
          isOpen={currentFilter === "region"}
          onClick={setCurrentFilter}
          onChange={setRegion}
        />
        <ProjectSearchFilter
          name={t({
            id: "offset.selectiveRetirement.filters.vintage",
            message: "vintage",
          })}
          options={filterOptions.vintages}
          isOpen={currentFilter === "vintage"}
          onClick={setCurrentFilter}
          onChange={setVintage}
        />
      </div>

      <ButtonPrimary
        label={t({
          id: "offset.selectiveRetirement.filters.find_project",
          message: "Find project",
        })}
        onClick={handleSubmit}
      />
    </>
  );
};
