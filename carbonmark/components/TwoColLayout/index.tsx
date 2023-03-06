import { cx } from "@emotion/css";
import { FC, ReactNode } from "react";

import * as styles from "./styles";

type Props = {
  children: ReactNode;
  className?: string;
};

export const TwoColLayout: FC<Props> = (props) => {
  return (
    <div className={cx(styles.wrapper, props.className)}>{props.children}</div>
  );
};

export const Col: FC<Props> = (props) => {
  return <div className={styles.col}>{props.children}</div>;
};
