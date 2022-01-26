import { cx } from "@emotion/css";
import React, { FC, HTMLProps } from "react";
import * as styles from "./styles";

type Props = HTMLProps<HTMLDivElement> & {
  variant?: "white" | "gray";
};

export const Section: FC<Props> = (props) => {
  return (
    <section
      {...props}
      className={cx(styles.section, props.variant, props.className)}
    >
      {props.children}
    </section>
  );
};
