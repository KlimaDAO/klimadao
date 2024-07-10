import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { RetirementToken } from "@klimadao/lib/constants";
import { Trans, t } from "@lingui/macro";
import ErrorIcon from "@mui/icons-material/Error";
import isEmpty from "lodash/isEmpty";
import { FC, useEffect, useState } from "react";

import { CarbonProject } from "../SelectiveRetirement/queryProjectDetails";
import { ConfirmProjectSelection } from "./ConfirmProjectSelection";
import { ProjectSearchForm } from "./ProjectSearchForm";
import { ProjectSelection } from "./ProjectSelection";
import { SelectProjectButton } from "./SelectProjectButton";

import * as styles from "./styles";

type Props = {
  projectAddress: string;
  selectedProject: CarbonProject | null;
  selectedRetirementToken: RetirementToken;
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
          selectedRetirementToken={props.selectedRetirementToken}
        />
      )}

      {step === "selectProject" && !isEmpty(projects) && (
        <ProjectSelection
          projects={projects}
          selectedProject={props.selectedProject}
          selectedRetirementToken={props.selectedRetirementToken}
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
              <Trans id="offset.selectiveRetirement.empty_search_results">
                We could not find any projects related to your search. Please
                modify the filters and try again.
              </Trans>
            </Text>
          </div>

          <ButtonPrimary
            label={t({
              id: "offset.selectiveRetirement.back_to_filters",
              message: "Back to filters",
            })}
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
          <SelectProjectButton
            active={true}
            project={props.selectedProject}
            selectedRetirementToken={props.selectedRetirementToken}
          />
          <ButtonPrimary
            label={t({
              id: "offset.selectiveRetirement.clear_selection",
              message: "Clear selection",
            })}
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
