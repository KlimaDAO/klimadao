import React from "react";
import styles from "./styles";
import { cx } from "@emotion/css";

export const TestRename2 = () => {
  return (
    <div>
      <p className={cx({ [styles.text]: true })}>testerrr</p>
    </div>
  );
};
