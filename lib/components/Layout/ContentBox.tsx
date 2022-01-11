import React, { FC } from "react";
import * as styles from "./styles";

export const ContentBox: FC = (props) => {
  return (
    <div className={styles.contentBox}>
      <div>{props.children}</div>
    </div>
  );
};
