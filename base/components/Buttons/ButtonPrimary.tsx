import { cx } from "@emotion/css";
import { FC, HTMLAttributes, JSX, ReactNode } from "react";
import * as styles from "./styles";

export type ButtonBaseProps = {
  label?: ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: "lightGray" | "transparent" | null;
  icon?: JSX.Element;
  disabled?: boolean;
} & HTMLAttributes<HTMLButtonElement> &
  HTMLAttributes<HTMLAnchorElement>;

export const ButtonPrimary: FC<ButtonBaseProps> = (props) => {
  const className = cx(
    styles.buttonPrimary,
    {
      lightGray: props.variant === "lightGray",
      transparent: props.variant === "transparent",
    },
    props.className
  );
  return (
    <button
      type="button"
      onClick={props.onClick}
      disabled={props.disabled}
      className={className}
    >
      {props.icon}
      {props.label}
    </button>
  );
};
