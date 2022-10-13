import React, { FC } from "react";

import * as styles from "./styles";

interface Props {
  active: boolean;
  label: string;
  onClick: () => void;
}

export const RetirementTypeButton: FC<Props> = (props) => (
  <button
    role="button"
    onClick={props.onClick}
    className={styles.retirementTypeButton}
    aria-label={props.label}
    data-active={props.active}
  >
    {props.label}
  </button>
);
