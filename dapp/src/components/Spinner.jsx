import styles from "./Spinner.module.css";
import React from "react";

export const Spinner = () => {
  return (
    <div className={styles.spinner}>
      <div></div>
      <div></div>
    </div>
  );
};
