import React, { FC } from "react";
import * as styles from "./styles";

export const Section: FC = (props) => {
  return <div className={styles.section}>{props.children}</div>;
};
