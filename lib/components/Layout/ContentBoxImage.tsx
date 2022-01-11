import React, { FC } from "react";
import * as styles from "./styles";

interface Props {
  variant?: "belowTextBox";
}

export const ContentBoxImage: FC<Props> = (props) => {
  const stylesForImage =
    props.variant === "belowTextBox"
      ? styles.contentBoxImageBelowText
      : styles.contentBoxImage;
  return <div className={stylesForImage}>{props.children}</div>;
};
