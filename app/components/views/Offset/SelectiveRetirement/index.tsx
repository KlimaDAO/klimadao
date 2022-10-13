import React, { FC, useState } from "react";
import { Trans } from "@lingui/macro";
import { ButtonPrimary, Text, TextInfoTooltip } from "@klimadao/lib/components";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import capitalize from "lodash/capitalize";

import { SelectiveRetirementInput } from "../SelectiveRetirementInput";
import { RetirementTypeButton } from "../RetirementTypeButton";
import { LoadingOverlay } from "../LoadingOverlay";
import { Checkbox } from "../Checkbox";

import {
  types,
  countries,
  vintages,
  mockProjectDetails,
} from "./filterOptions";
import * as styles from "./styles";

type Props = {
  projectAddress: string;
  setProjectAddress: (address: string) => void;
};

export const SelectiveRetirement: FC<Props> = (props) => {
  const [inputMode, setInputMode] = useState("project");
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.label}>
        <Text t="caption" color="lighter">
          <Trans id="offset.retire_specific">
            Retire specific project tokens
          </Trans>
        </Text>
        <TextInfoTooltip
          content={
            <Trans id="offset.retire_specific_tooltip">
              Subject to additional fee, determined by the selected pool and
              paid to the bridge provider.
            </Trans>
          }
        >
          <InfoOutlined />
        </TextInfoTooltip>
      </div>

      <div className={styles.secondaryContainer}>
        <div className={styles.options}>
          {isLoading && <LoadingOverlay />}

          <RetirementTypeButton
            label="From project"
            active={inputMode === "project"}
            onClick={() => setInputMode("project")}
          />
          <RetirementTypeButton
            label="From 0x address"
            active={inputMode === "address"}
            onClick={() => setInputMode("address")}
          />
        </div>

        {inputMode === "project" && (
          <OffsetProjectSearch
            setIsLoading={setIsLoading}
            setProjectAddress={props.setProjectAddress}
          />
        )}

        {inputMode === "address" && (
          <SelectiveRetirementInput
            projectAddress={props.projectAddress}
            setProjectAddress={props.setProjectAddress}
          />
        )}
      </div>
    </div>
  );
};

const OffsetProjectSearch = (props) => {
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
    }, 5000);
  };

  return (
    <>
      {step === "search" && (
        <>
          <div>
            <ProjectFilter
              name="type"
              options={types}
              isOpen={currentFilter === "type"}
              onClick={setCurrentFilter}
              onChange={setType}
            />
            <ProjectFilter
              name="region"
              options={countries}
              isOpen={currentFilter === "region"}
              onClick={setCurrentFilter}
              onChange={setRegion}
            />
            <ProjectFilter
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
        <>
          <div className={styles.projectList}>
            {projects.map((project, index) => (
              <SelectProjectButton
                key={index}
                {...project}
                setSelectedProject={setSelectedProject}
                active={selectedProject === project.tokenAddress}
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
              onClick={() => setSelectedProject("something")}
            />
          </div>
        </>
      )}
    </>
  );
};

import CheckIcon from "@mui/icons-material/Check";

const SelectProjectButton = (props) => (
  <button
    className={styles.selectProjectButton}
    onClick={() => props.setSelectedProject(props.tokenAddress)}
    data-active={props.active}
  >
    <div className={styles.header}>
      <Text t="caption">{props.methodologyCategory}</Text>
      <div className={styles.checkedIcon} data-active={props.active}>
        <CheckIcon />
      </div>
    </div>

    <Text t="body4">
      {props.name} {"->"}
    </Text>
    <Text t="badge" className={styles.regionLabel}>
      {props.region}
    </Text>
  </button>
);

const ProjectFilter: React.FC = (props) => {
  const [parent] = useAutoAnimate();
  const [checked, setChecked] = useState([]);

  const handleCheck = (event) => {
    let updatedList = [...checked];
    if (event.target.checked) {
      updatedList = [...checked, event.target.value];
    } else {
      updatedList.splice(checked.indexOf(event.target.value), 1);
    }
    console.log(updatedList);
    setChecked(updatedList);
    props.onChange(updatedList);
  };

  const isChecked = (item) => checked.includes(item);

  const handleClick = () =>
    props.onClick(() => (props.isOpen ? null : props.name));

  return (
    <div className={styles.dropdownContainer} ref={parent}>
      <div className={styles.titleContainer} onClick={handleClick}>
        <div className={styles.title}>
          <Text t="body8">{capitalize(props.name)}</Text>

          {checked.length > 0 && (
            <Text t="body8" className={styles.selectedCount}>
              {checked.length} selected
            </Text>
          )}
        </div>
        <ExpandMoreIcon />
      </div>

      {props.isOpen && (
        <div className={styles.selectOptions}>
          {props.options.map((option, index) => (
            <div key={index} className={styles.checkboxGroup}>
              <label>
                <Checkbox
                  onChange={handleCheck}
                  checked={isChecked(option.value)}
                  value={option.value}
                />{" "}
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
