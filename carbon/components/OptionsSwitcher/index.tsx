"use client";
/**
 * A widget to choose betwwen different options
 * name: name of the widget (for state persistence state)
 * options: Options offered by the widget
 * onSelectionChange: function triggered when an option is selected
 * value: initial value of the widget
 * className: className to apply to the widget
 */
import { OptionChangeHandler, Options } from "lib/charts/options";
import { Key, useEffect, useState } from "react";
import styles from "./styles.module.scss";

export default function OptionsSwitcher<T extends Key>(props: {
  name: string;
  options: Options<T>;
  onSelectionChange?: OptionChangeHandler<T>;
  value?: T;
  className?: string;
  readonly?: boolean;
}) {
  // The widget initial value is the first option value or the value from the url query
  let initialValue = props.value || props.options[0].value;
  if ("undefined" !== typeof window) {
    const url = new URL(window.location.href);
    initialValue = (url.searchParams.get(props.name) as T) || initialValue;
  }
  const [selected, setSelected] = useState<T>(
    props.value || props.options[0].value
  );
  const readonly = props.readonly === undefined ? false : props.readonly;

  // Notify the parent of the initial value
  useEffect(() => {
    const url = new URL(window.location.href);
    initialValue = (url.searchParams.get(props.name) as T) || initialValue;
    setSelected(initialValue);
    console.log(initialValue);
    if (!readonly && props.onSelectionChange) {
      props.onSelectionChange(initialValue);
    }
  }, []);

  const select: OptionChangeHandler<T> = (value) => {
    if (props.readonly) return;
    // Change value
    setSelected(value);

    // Update URL if possible
    if ("undefined" !== typeof history.pushState) {
      const url = new URL(window.location.href);
      url.searchParams.set(props.name, String(value));
      history.pushState({}, document.title, url.href);
    }
    // Notify parent
    if (!readonly && props.onSelectionChange) {
      return props.onSelectionChange(value);
    }
  };
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
            onClick={() => select(option.value)}
            data-selected={selected == option.value}
          >
            {option.label}
          </li>
        ))}
    </ul>
  );
}
