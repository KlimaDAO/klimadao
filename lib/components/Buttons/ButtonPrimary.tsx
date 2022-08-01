import React, { FC, ReactNode } from "react";
import * as styles from "./styles";
import { Link } from "../types";
import { cx } from "@emotion/css";

interface Props {
  label: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "gray" | "icon" | "blueRounded" | null;
  link?: Link;
  rel?: string;
  target?: string;
  isExternalHref?: boolean;
  disabled?: boolean;
  secondary?: boolean;
}

export const ButtonPrimary: FC<Props> = ({ link: LinkElement, ...props }) => {
  let buttonStyle;
  if (props.variant === "gray") {
    props.secondary
      ? (buttonStyle = cx(
          styles.button_secondary,
          styles.button_secondary_gray,
          props.className
        ))
      : (buttonStyle = cx(
          styles.button_primary,
          styles.button_primary_gray,
          props.className
        ));
  } else if (props.variant === "blueRounded") {
    props.secondary
      ? (buttonStyle = cx(
          styles.button_secondary,
          styles.button_secondary_blue,
          props.className
        ))
      : (buttonStyle = cx(
          styles.button_primary,
          styles.button_primary_blue,
          props.className
        ));
  } else {
    buttonStyle = cx(
      props.secondary ? styles.button_secondary : styles.button_primary,
      props.className,
      {
        icon: props.variant === "icon",
      }
    );
  }

  if (props.href) {
    if (LinkElement) {
      return (
        <LinkElement href={props.href}>
          <a className={buttonStyle}>{props.label}</a>
        </LinkElement>
      );
    }

    return (
      <a {...props} className={buttonStyle} href={props.href}>
        {props.label}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={buttonStyle}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
};
