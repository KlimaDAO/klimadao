/**
 * A widget to choose betwwen different options
 */
import { OptionChangeHandler, Options } from "lib/charts/options";
import { Key, useState } from "react";
import styles from "./styles.module.scss";

export default function OptionsSwitcher<T extends Key>(props: {
  options: Options<T>;
  onSelectionChange: OptionChangeHandler<T>;
  value?: T;
  className?: string;
}) {
  const [selected, setSelected] = useState<T>(
    props.value || props.options[0].value
  );
  const select: OptionChangeHandler<T> = (value) => {
    setSelected(value);
    return props.onSelectionChange(value);
  };
  return (
    <ul
      className={`${styles.list} ${!!props.className ? props.className : ""}`}
    >
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
