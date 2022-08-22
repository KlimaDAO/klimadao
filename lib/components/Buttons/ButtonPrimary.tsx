import { BaseButton, Props } from "./ButtonBase";
import React, { FC } from "react";
import * as styles from "./styles";
import { cx } from "@emotion/css";

export const ButtonPrimary: FC<Props> = (props) => {
  const buttonStyle = cx(
    styles.buttonPrimary,
    {
      gray: props.variant === "gray",
      blue: props.variant === "blue",
      blueRounded: props.variant === "blueRounded",
      icon: props.variant === "icon",
    },
    props.className
  );
  return <BaseButton {...props} buttonStyle={buttonStyle} />;
};
