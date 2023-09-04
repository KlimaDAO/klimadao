import { cx } from "@emotion/css";
import { TextInfoTooltip } from "components/TextInfoTooltip";
import { FC, HTMLAttributes } from "react";
import * as styles from "./styles";

type ToggleProps = {
  options: ToggleOptionProps[];
  selected: ToggleOptionProps["value"];
  onChange?: (value: string | undefined | number) => void;
} & HTMLAttributes<HTMLDivElement>;

/** Multi option Toggle (radio) component  */
export const Toggle: FC<ToggleProps> = ({
  options,
  onChange,
  selected,
  className,
  ...rest
}) => {
  return (
    <div className={cx(styles.main, className)} {...rest}>
      {options.map((option) => (
        <ToggleOption
          tooltip={option.tooltip}
          key={option.value}
          content={option.content}
          value={option.value}
          onClick={() => onChange?.(option.value)}
          className={cx({ selected: selected === option.value })}
        />
      ))}
    </div>
  );
};

type ToggleOptionProps = {
  content: React.ReactElement;
  value: string | number;
  tooltip?: string;
} & Pick<HTMLAttributes<HTMLButtonElement>, "onClick" | "className">;

const ToggleOption: FC<ToggleOptionProps> = (props) => (
  <TextInfoTooltip tooltip={props.tooltip}>
    <button
      onClick={props.onClick}
      className={cx(styles.button, props.className)}
    >
      {props.content}
    </button>
  </TextInfoTooltip>
);
