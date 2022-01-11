import React, { FC } from "react";
import * as styles from "./styles";

interface Props {
  text: string;
  variant?: string;
}

export const Heading: FC<Props> = (props) => {
  return <h2 className={styles.heading1}>{props.text}</h2>;
};
