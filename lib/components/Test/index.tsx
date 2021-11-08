import React from "react";
import styles from "./styles";
import { cx } from "@emotion/css";

export const Test = () => {
  return (
    <div>
      <p className={cx({ [styles.text]: true })}>testerrr</p>
    </div>
  );
};
