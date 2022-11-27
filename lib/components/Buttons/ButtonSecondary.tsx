import { cx } from "@emotion/css";
import React, { FC } from "react";
import { BaseButton, Props } from "./ButtonBase";
import * as styles from "./styles";

export const ButtonSecondary: FC<Props> = (props) => {
  const className = cx(
    styles.buttonSecondary,
    {
      gray: props.variant === "gray",
      blue: props.variant === "blue",
      blueRounded: props.variant === "blueRounded",
      icon: props.variant === "icon",
    },
    props.className
  );
  return <BaseButton {...props} className={className} />;
};
