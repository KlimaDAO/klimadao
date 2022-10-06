import React, { useState } from "react";
import { ButtonPrimary, Text } from "@klimadao/lib/components";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import capitalize from "lodash/capitalize";

import { SelectiveRetirementInput } from "../SelectiveRetirementInput";
import { Checkbox } from "../Checkbox";
import * as styles from "./styles";

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
          isOpen={currentFilter === "type"}
          onClick={setCurrentFilter}
        />
        <Dropdown
          name="country"
          isOpen={currentFilter === "country"}
          onClick={setCurrentFilter}
        />
        <Dropdown
          name="vintage"
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
          <div className={styles.checkboxGroup}>
            <label>
              <Checkbox
                onChange={handleCheck}
                checked={isChecked("1")}
                value="1"
              />{" "}
              Uno
            </label>
          </div>
          <div className={styles.checkboxGroup}>
            <label>
              <Checkbox
                onChange={handleCheck}
                checked={isChecked("2")}
                value="2"
              />{" "}
              Dos
            </label>
          </div>
          <div className={styles.checkboxGroup}>
            <label>
              <Checkbox
                onChange={handleCheck}
                checked={isChecked("3")}
                value="3"
              />{" "}
              Tres
            </label>
          </div>
          <div className={styles.checkboxGroup}>
            <label>
              <Checkbox
                onChange={handleCheck}
                checked={isChecked("4")}
                value="4"
              />{" "}
              Tres Tres Tres Tres Tres Tres Tres Tres Tres Tres Tres Tres
            </label>
          </div>
          <div className={styles.checkboxGroup}>
            <label>
              <Checkbox
                onChange={handleCheck}
                checked={isChecked("5")}
                value="5"
              />{" "}
              Tres
            </label>
          </div>
          <div className={styles.checkboxGroup}>
            <label>
              <Checkbox
                onChange={handleCheck}
                checked={isChecked("6")}
                value="6"
              />{" "}
              Tres
            </label>
          </div>
          <div className={styles.checkboxGroup}>
            <label>
              <Checkbox
                onChange={handleCheck}
                checked={isChecked("7")}
                value="7"
              />{" "}
              Tres
            </label>
          </div>
          <div className={styles.checkboxGroup}>
            <label>
              <Checkbox
                onChange={handleCheck}
                checked={isChecked("8")}
                value="8"
              />{" "}
              Tres
            </label>
          </div>
          <div className={styles.checkboxGroup}>
            <label>
              <Checkbox
                onChange={handleCheck}
                checked={isChecked("9")}
                value="9"
              />{" "}
              Tres
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
