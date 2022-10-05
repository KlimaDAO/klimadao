import { BaseButton, ButtonBaseProps } from "./ButtonBase";
import React, { FC } from "react";
import * as styles from "./styles";
import { cx } from "@emotion/css";

export const ButtonSecondary: FC<ButtonBaseProps> = (props) => {
  const className = cx(
    styles.buttonSecondary,
    {
      gray: props.variant === "gray",
      blue: props.variant === "blue",
      transparent: props.variant === "transparent",
      red: props.variant === "red",
    },
    props.className
  );
  return <BaseButton {...props} className={className} />;
};
