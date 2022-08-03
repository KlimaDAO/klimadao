import React, { FC, ReactNode } from "react";
import { Link } from "../types";

export interface Props {
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
}

interface BaseProps extends Props {
  buttonStyle: string;
}

export const BaseButton: FC<BaseProps> = ({ link: LinkElement, ...props }) => {
  if (props.href) {
    if (LinkElement) {
      return (
        <LinkElement href={props.href}>
          <a className={props.buttonStyle}>{props.label}</a>
        </LinkElement>
      );
    }

    return (
      <a {...props} className={props.buttonStyle} href={props.href}>
        {props.label}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={props.buttonStyle}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
};
