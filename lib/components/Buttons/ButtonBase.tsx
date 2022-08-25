import React, { FC, ReactNode } from "react";
import { Link } from "../types";

export interface Props {
  label: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "gray" | "icon" | "blue" | "blueRounded" | null;
  link?: Link;
  rel?: string;
  target?: string;
  isExternalHref?: boolean;
  disabled?: boolean;
  type?: "submit" | "reset" | "button";
}

interface BaseProps extends Props {
  buttonStyle: string;
}

export const BaseButton: FC<BaseProps> = ({
  link: LinkElement,
  buttonStyle,
  type,
  ...props
}) => {
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
      type={type || "button"}
      className={buttonStyle}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
};
