import React, { FC, ReactNode } from "react";
import * as styles from "./styles";
import { Link } from "../types";
import { cx } from "@emotion/css";

interface Props {
  label: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "gray" | "icon" | "blue" | null;
  link?: Link;
  rel?: string;
  target?: string;
  isExternalHref?: boolean;
  disabled?: boolean;
}

export const ButtonPrimary: FC<Props> = ({ link: LinkElement, ...props }) => {
  const buttonStyle =
    props.variant === "gray"
      ? cx(styles.button_primary, styles.button_gray, props.className)
      : props.variant === "blue"
      ? cx(styles.button_primary, styles.button_blue, props.className)
      : cx(styles.button_primary, props.className, {
          icon: props.variant === "icon",
        });

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
