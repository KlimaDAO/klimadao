import React, { FC } from "react";
import * as styles from "./styles";

interface Props {
  isToggled: boolean;
  onClick: () => void;
}

export const ToggleNavButton: FC<Props> = (props) => {
  return (
    <button
      type="button"
      className={styles.buttonToggleNav}
      onClick={props.onClick}
    >
      <span className={styles.hamburgerOuter}>
        {props.isToggled ? (
          <span className={styles.hamburgerInnerToggled}></span>
        ) : (
          <span className={styles.hamburgerInner}></span>
        )}
      </span>
    </button>
  );
};
