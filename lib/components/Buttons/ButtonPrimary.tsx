import React, { FC } from "react";
import * as styles from "./styles";

interface PropsBase {
  label: string;
}
interface PropsButton extends PropsBase {
  onClick: () => void;
  href?: never;
}
interface PropsLink
  extends PropsBase,
    React.AnchorHTMLAttributes<HTMLAnchorElement> {
  onClick?: never;
  href: string;
}

type Props = PropsButton | PropsLink;

export const ButtonPrimary: FC<Props> = (props) => {
  if (props.href) {
    return (
      <a {...props} className={styles.button_primary} href={props.href}>
        {props.label}
      </a>
    );
  }
  return (
    <button
      type="button"
      className={styles.button_primary}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};
