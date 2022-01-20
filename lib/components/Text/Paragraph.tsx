import React, { FC, HTMLAttributes } from "react";
import * as styles from "./styles";
import { cx } from "@emotion/css";

type Props = HTMLAttributes<HTMLParagraphElement>;

export const Paragraph: FC<Props> = (props) => {
  return (
    <p className={cx(styles.copy, props.className)} {...props}>
      {props.children}
    </p>
  );
};
