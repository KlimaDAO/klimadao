import React, { useState } from "react";
import { Trans } from "@lingui/macro";
import { ButtonPrimary, Text, TextInfoTooltip } from "@klimadao/lib/components";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import capitalize from "lodash/capitalize";

import { SelectiveRetirementInput } from "../SelectiveRetirementInput";
import { RetirementTypeButton } from "../RetirementTypeButton";
import { Checkbox } from "../Checkbox";
import * as styles from "./styles";

import { types, countries, vintages } from "./filterOptions";

export const SelectiveRetirement = () => {
  const [inputMode, setInputMode] = useState("project");

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

      <div className={styles.options}>
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

      {inputMode === "project" && <OffsetProjectSearch />}
      {inputMode === "address" && <SelectiveRetirementInput />}
    </div>
  );
};

const OffsetProjectSearch = () => {
  const [currentFilter, setCurrentFilter] = useState(null);
  const [type, setType] = useState(null);
  const [region, setRegion] = useState(null);
  const [vintage, setVintage] = useState(null);

  const handleSubmit = () => {
    console.log([type, region, vintage]);
  };
  return (
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
  );
};

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
