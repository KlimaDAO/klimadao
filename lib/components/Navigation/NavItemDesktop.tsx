import React, { FC } from "react";
import * as styles from "./styles";

export declare type LinkProps = {
  href: string;
  as?: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  locale?: string | false;
};

type Link = (
  props: React.PropsWithChildren<LinkProps>
) => React.DetailedReactHTMLElement<
  {
    onMouseEnter?: React.MouseEventHandler<Element> | undefined;
    onClick: React.MouseEventHandler;
    href?: string | undefined;
    ref?: any;
  },
  HTMLElement
>;

interface Props extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  name: string;
  url: string;
  active?: boolean;
  link?: Link;
}

export const NavItemDesktop: FC<Props> = (props) => {
  if (props.link) {
    return <props.link href={props.url}>{props.name}</props.link>;
  }

  return (
    <a
      {...props}
      className={styles.navMain_DesktopLink}
      href={props.url}
      data-active={props.active}
    >
      {props.name}
    </a>
  );
};
