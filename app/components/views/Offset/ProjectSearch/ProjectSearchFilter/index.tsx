import React, { ChangeEvent, FC, useState } from "react";
import { Text } from "@klimadao/lib/components";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import capitalize from "lodash/capitalize";

import { Checkbox } from "../Checkbox";
import * as styles from "./styles";

type Props = {
  isOpen: boolean;
  name: string;
  options: { value: string; label: string }[];
  onChange: (values: string[]) => void;
  onClick: (fn: () => string | null) => void;
};

export const ProjectSearchFilter: FC<Props> = (props) => {
  const [parent] = useAutoAnimate();
  const [checked, setChecked] = useState([]);

  const handleCheck = (event: ChangeEvent<HTMLInputElement>) => {
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

  const isChecked = (item: string) => checked.includes(item);

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
