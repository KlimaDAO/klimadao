import React, { FC } from "react";
import * as styles from "./styles";

interface Props {
  onClick: () => void;
  label: string;
}

export const ButtonPrimary: FC<Props> = (props) => {
  return (
    <button
      type="button"
      className={styles.button_primary}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};
