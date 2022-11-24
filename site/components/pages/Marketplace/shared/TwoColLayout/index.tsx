import { FC, ReactNode } from "react";

import * as styles from "./styles";

type Props = {
  children: ReactNode;
};

export const TwoColLayout: FC<Props> = (props) => {
  return <div className={styles.wrapper}>{props.children}</div>;
};

export const Col: FC<Props> = (props) => {
  return <div className={styles.col}>{props.children}</div>;
};
