import React, { FC } from "react";
import { cx } from "@emotion/css";

import * as styles from "./styles";

interface Props {
  text: string;
  align?: "center";
}

export const Heading: FC<Props> = (props) => {
  const combinedStyles =
    props.align === "center"
      ? cx(styles.heading1, styles.headingCentered)
      : styles.heading1;

  return <h2 className={combinedStyles}>{props.text}</h2>;
};
