import React, { FC } from "react";
import * as styles from "./styles";

interface Props {
  label: string;
  onClick: () => void;
  active: boolean;
}

export const SortyByOption: FC<Props> = (props) => {
  return (
    <div>
      <button
        onClick={props.onClick}
        role="button"
        className={styles.dropDownOption}
        aria-label={props.label}
        data-active={props.active}
      >
        {props.label}
      </button>
    </div>
  );
};
