import React, { FC } from "react";
import * as styles from "./styles";

interface Props {
  text: string;
  variant?: string;
}

export const Copy: FC<Props> = (props) => {
  return <p className={styles.copy}>{props.text}</p>;
};
