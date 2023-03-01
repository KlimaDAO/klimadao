import { cx } from "@emotion/css";
import React, { FC, HTMLProps } from "react";
import * as styles from "./styles";

type Props = HTMLProps<HTMLDivElement> & {
  variant?: "white" | "darkgray" | "gray" | "black";
  fillViewport?: boolean;
};

export const Section: FC<Props> = ({ variant, fillViewport, ...props }) => {
  return (
    <section
      {...props}
      className={cx(
        styles.section,
        variant,
        {
          fillViewport,
        },
        props.className
      )}
    >
      {props.children}
    </section>
  );
};
