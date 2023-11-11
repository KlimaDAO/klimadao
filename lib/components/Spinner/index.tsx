import { cx } from "@emotion/css";
import React from "react";
import styles from "./styles";

export const Spinner = () => {
  return (
    <div className={cx("spinner", styles.spinner)}>
      <div></div>
      <div></div>
    </div>
  );
};
