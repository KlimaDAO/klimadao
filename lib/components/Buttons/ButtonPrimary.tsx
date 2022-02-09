import React, { FC } from "react";
import * as styles from "./styles";
import { Link } from "../types";
import { cx } from "@emotion/css";

interface PropsBase {
  label: string;
}
interface PropsButton
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    PropsBase {
  onClick: () => void;
  href?: never;
  variant?: "gray";
  link?: Link;
}
interface PropsLink
  extends PropsBase,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  onClick?: never;
  href: string;
  variant?: "gray" | null;
  link?: Link;
  isExternalHref?: boolean;
}

type Props = PropsButton | PropsLink;

export const ButtonPrimary: FC<Props> = ({ link: LinkElement, ...props }) => {
  const buttonStyle = props.variant
    ? cx(styles.button_primary, styles.button_gray, props.className)
    : cx(styles.button_primary, props.className);

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
    <button type="button" className={buttonStyle} onClick={props.onClick}>
      {props.label}
    </button>
  );
};
