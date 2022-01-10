import React, { FC } from "react";
import * as styles from "./styles";

export const PageWrap: FC = (props) => {
  return <div className={styles.theme}>{props.children}</div>;
};
