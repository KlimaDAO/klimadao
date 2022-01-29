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

export const ButtonPrimary: FC<Props> = (props) => {
  const buttonStyle = props.variant
    ? cx(styles.button_primary, styles.button_gray, props.className)
    : styles.button_primary;

  if (props.href) {
    if (props.link) {
      return (
        <props.link href={props.href}>
          <a {...props} className={buttonStyle}>
            {props.label}
          </a>
        </props.link>
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
