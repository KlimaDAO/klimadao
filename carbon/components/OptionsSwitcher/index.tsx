"use client";
/**
 * A widget to choose betwwen different options
 * name: name of the widget (for state persistence state)
 * options: Options offered by the widget
 * onSelectionChange: function triggered when an option is selected
 * value: initial value of the widget
 * className: className to apply to the widget
 */
import { useQueryParam } from "hooks/useQueryParam";
import { OptionChangeHandler, Options } from "lib/charts/options";
import { Key } from "react";
import styles from "./styles.module.scss";

export default function OptionsSwitcher<T extends Key>(props: {
  name: string;
  options: Options<T>;
  onSelectionChange?: OptionChangeHandler<T>;
  value?: T;
  className?: string;
  readonly?: boolean;
}) {
  const readonly = props.readonly ?? false;
  const [selected, setSelected] = useQueryParam<T>({
    key: props.name,
    defaultValue: props.value || props.options[0].value,
    readonly,
    onValueChange: props.onSelectionChange,
  });

  return (
    // FIXME: this doesn't let you override certain styles
    <ul
      className={`${styles.list} ${!!props.className ? props.className : ""}`}
    >
      {props.options
        .filter((option) => !readonly || selected == option.value)
        .map((option) => (
          <li
            key={option.value}
            onClick={() => setSelected(option.value)}
            data-selected={selected == option.value}
          >
            {option.label}
          </li>
        ))}
    </ul>
  );
}
