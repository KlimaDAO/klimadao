import React, { FC } from "react";

import * as styles from "./styles";

interface Props {
  label: string;
  onClick: () => void;
  active: boolean;
}

export const SortByButton: FC<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      role="button"
      className={styles.sortbyButton}
      aria-label={props.label}
      data-active={props.active}
    >
      {props.label}
    </button>
  );
};
