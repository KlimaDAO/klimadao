import React, { FC } from "react";
import * as styles from "./styles";

interface Props {
  children: JSX.Element[];
}

export const PageWrap: FC<Props> = (props) => {
  return <div className={styles.theme}>{props.children}</div>;
};
