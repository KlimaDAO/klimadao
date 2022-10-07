import React, { useState } from "react";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import capitalize from "lodash/capitalize";

import { SelectiveRetirementInput } from "../SelectiveRetirementInput";
import { Checkbox } from "../Checkbox";
import * as styles from "./styles";

import { types, countries, vintages } from "./filterOptions";

export const SelectiveRetirement = () => {
  const [inputMode, setInputMode] = useState("project");
  return (
    <>
      <div className={styles.options}>
        <ButtonPrimary
          label="From project"
          onClick={() => setInputMode("project")}
        />
        <ButtonPrimary
          label="From 0x address"
          onClick={() => setInputMode("address")}
        />
      </div>

      {inputMode === "project" && <OffsetProjectSearch />}
      {inputMode === "address" && <SelectiveRetirementInput />}
    </>
  );
};

const OffsetProjectSearch = () => {
  const [currentFilter, setCurrentFilter] = useState(null);

  return (
    <>
      <div>
        <Dropdown
          name="type"
          options={types}
          isOpen={currentFilter === "type"}
          onClick={setCurrentFilter}
        />
        <Dropdown
          name="region"
          options={countries}
          isOpen={currentFilter === "region"}
          onClick={setCurrentFilter}
        />
        <Dropdown
          name="vintage"
          options={vintages}
          isOpen={currentFilter === "vintage"}
          onClick={setCurrentFilter}
        />
      </div>
      <ButtonPrimary label="Find project" />
    </>
  );
};

const OffsetProjectFilters = () => {};

const Dropdown: React.FC = (props) => {
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
                  checked={isChecked(option)}
                  value={option}
                />{" "}
                {option}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
