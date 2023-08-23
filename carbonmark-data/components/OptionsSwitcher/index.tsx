/**
 * A widget to choose betwwen different options
 */
import { OptionChangeHandler, Options } from "lib/charts/options";
import { Key, useState } from "react";
import * as styles from "./styles";

export default function OptionsSwitcher(props: {
  options: Options;
  onSelectionChange: OptionChangeHandler;
}) {
  const [selected, setSelected] = useState<Key>(props.options[0].value);
  const select: OptionChangeHandler = (value) => {
    setSelected(value);
    return props.onSelectionChange(value);
  };
  return (
    <ul className={styles.list}>
      {props.options.map((option) => (
        <li
          key={option.value}
          onClick={() => select(option.value)}
          data-selected={selected == option.value}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
}
