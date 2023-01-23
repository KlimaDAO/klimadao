import { cx } from "@emotion/css";
import React, { FC, HTMLAttributes, ReactElement, ReactNode } from "react";

interface RenderLinkProps {
  href: string;
  children: ReactElement;
  className?: string;
}
export type ButtonBaseProps = {
  label?: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "lightGray" | "gray" | "blue" | "red" | "transparent" | null;
  icon?: JSX.Element;
  /** Show icon as suffix, prefix by default */
  iconPos?: "suffix" | "prefix";
  renderLink?: (p: RenderLinkProps) => ReactElement;
  rel?: string;
  target?: string;
  isExternalHref?: boolean;
  disabled?: boolean;
  shape?: "default" | "rounded" | "circle";
  type?: "button" | "submit" | "reset";
} & HTMLAttributes<HTMLButtonElement> &
  HTMLAttributes<HTMLAnchorElement>;

interface BaseProps extends ButtonBaseProps {
  className: string;
}

export const BaseButton: FC<BaseProps> = (props) => {
  const icon = !!props.icon;
  const circle = props.shape === "circle";
  const rounded = props.shape === "rounded";
  const suffix = props.iconPos === "suffix";

  /** Conditional styling */
  const buttonStyle = cx({ rounded, icon, circle, suffix }, props.className);

  if (props.href && props.renderLink)
    return props.renderLink({
      href: props.href,
      className: buttonStyle,
      children: <>{props.label}</>,
    });

  if (props.href)
    return (
      <a {...props} className={buttonStyle} href={props.href}>
        {props.icon}
        {props.label}
      </a>
    );

  return (
    <button
      type={props.type || "button"}
      className={buttonStyle}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.icon}
      {props.label}
    </button>
  );
};
