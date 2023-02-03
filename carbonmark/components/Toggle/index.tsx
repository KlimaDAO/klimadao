import { cx } from "@emotion/css";
import { FC, HTMLAttributes, ReactNode, useEffect, useState } from "react";
import * as styles from "./styles";

type ToggleProps = {
  options: ToggleOptionProps[];
  onChange?: (value: string | undefined | number) => void;
};

/** Multi option Toggle (radio) component  */
export const Toggle: FC<ToggleProps> = (props) => {
  const [selected, setSelected] = useState(props.options.at(0)?.value);

  /** Notify the parent component of value change */
  useEffect(() => {
    props.onChange?.(selected);
  }, [selected]);

  return (
    <div className={styles.main}>
      {props.options.map((option) => (
        <ToggleOption
          content={option.content}
          value={option.value}
          key={option.value}
          onClick={() => setSelected(option.value)}
          className={cx({ selected: selected === option.value })}
        />
      ))}
    </div>
  );
};

type ToggleOptionProps = {
  content: ReactNode | string;
  value: string | number;
} & HTMLAttributes<HTMLButtonElement>;

const ToggleOption: FC<ToggleOptionProps> = (props) => (
  <button
    onClick={props.onClick}
    className={cx(styles.button, props.className)}
  >
    {props.content}
  </button>
);
