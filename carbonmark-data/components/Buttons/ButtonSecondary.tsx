import { cx } from "@emotion/css";
import {
  ButtonBaseProps,
  ButtonPrimary as KlimaButton,
} from "@klimadao/lib/components";
import { FC } from "react";
import * as styles from "./styles";

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
  return <KlimaButton {...props} className={className} />;
};
