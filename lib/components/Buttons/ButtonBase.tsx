import React, { FC, ReactElement, ReactNode } from "react";

interface RenderLinkProps {
  href: string;
  children: ReactElement;
  className?: string;
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
  className: string;
}

export const BaseButton: FC<BaseProps> = (props) => {
  if (props.href && props.renderLink)
    return props.renderLink({
      href: props.href,
      className: props.className,
      children: <>{props.label}</>,
    });

  if (props.href)
    return (
      <a {...props} className={props.className} href={props.href}>
        {props.label}
      </a>
    );

  return (
    <button
      type={props.type || "button"}
      className={props.className}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.label}
    </button>
  );
};
