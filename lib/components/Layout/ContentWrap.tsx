import React, { FC } from "react";
import * as styles from "./styles";

export const ContentWrap: FC = (props) => {
  return <div className={styles.content}>{props.children}</div>;
};
