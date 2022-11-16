import React, { FC, ReactElement, ReactNode } from "react";

interface RenderLinkProps {
  href: string;
  children: ReactElement;
}
export interface Props {
  label: ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  variant?: "gray" | "icon" | "blue" | "blueRounded" | null;
  renderLink?: (p: RenderLinkProps) => ReactElement;
  rel?: string;
  target?: string;
  isExternalHref?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}

interface BaseProps extends Props {
  buttonStyle: string;
}

export const BaseButton: FC<BaseProps> = ({ buttonStyle, ...props }) => {
  if (props.href && props.renderLink)
    return props.renderLink({
      href: props.href,
      children: <a className={buttonStyle}>{props.label}</a>,
    });

  if (props.href)
    return (
      <a {...props} className={buttonStyle} href={props.href}>
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
      {props.label}
    </button>
  );
};
