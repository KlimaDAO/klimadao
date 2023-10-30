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
  onSelectionChange: OptionChangeHandler<T>;
  value?: T;
  className?: string;
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

  // Notify the parent of the initial value
  useEffect(() => {
    const url = new URL(window.location.href);
    initialValue = (url.searchParams.get(props.name) as T) || initialValue;
    setSelected(initialValue);
    props.onSelectionChange(initialValue);
  }, []);

  const select: OptionChangeHandler<T> = (value) => {
    // Change value
    setSelected(value);

    // Update URL if possible
    if ("undefined" !== typeof history.pushState) {
      const url = new URL(window.location.href);
      url.searchParams.set(props.name, String(value));
      history.pushState({}, document.title, url.href);
    }
    // Notify parent
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
