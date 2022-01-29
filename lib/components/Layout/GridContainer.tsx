import { cx } from "@emotion/css";
import React, { FC, HTMLProps } from "react";
import * as styles from "./styles";

type Props = HTMLProps<HTMLDivElement>;

/** Container that allows you to use grid-column: full or grid-column: main */
export const GridContainer: FC<Props> = (props) => {
  return (
    <div {...props} className={cx(styles.gridContainer, props.className)}>
      {props.children}
    </div>
  );
};
