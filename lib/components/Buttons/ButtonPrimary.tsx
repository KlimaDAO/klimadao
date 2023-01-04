import { cx } from "@emotion/css";
import React, { FC } from "react";
import { BaseButton, ButtonBaseProps } from "./ButtonBase";
import * as styles from "./styles";

export const ButtonPrimary: FC<ButtonBaseProps> = (props) => {
  const className = cx(
    styles.buttonPrimary,
    {
      lightGray: props.variant === "lightGray",
      gray: props.variant === "gray",
      blue: props.variant === "blue",
      red: props.variant === "red",
      transparent: props.variant === "transparent",
    },
    props.className
  );
  return <BaseButton {...props} className={className} />;
};
