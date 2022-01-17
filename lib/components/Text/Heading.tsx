import React, { FC } from "react";
import { cx } from "@emotion/css";

import * as styles from "./styles";

const mappedStyles = {
  large: styles.headingLarge,
  medium: styles.headingMedium,
  small: styles.headingSmall,
};

interface Props {
  text: string;
  align?: "center";
  variant?: "large" | "medium" | "small";
}

export const Heading: FC<Props> = (props) => {
  const align = props.align === "center" && styles.alignCenter;
  const variant =
    (props.variant && mappedStyles[props.variant]) || styles.headingLarge;
  const combinedStyles = cx(variant, align);

  return <h2 className={combinedStyles}>{props.text}</h2>;
};
