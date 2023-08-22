/**
 * A widget to choose betwwen different options
 */
import { OptionChangeHandler, Options } from "lib/charts/options";

export default function OptionsSwitcher<T>(props: {
  options: Options<T>;
  onSelectionChange: OptionChangeHandler;
}) {
  return (
    <ul>
      {props.options.map((option) => (
        <li
          key={option.value}
          onClick={() => props.onSelectionChange(option.value)}
        >
          {option.label}
        </li>
      ))}
    </ul>
  );
}
