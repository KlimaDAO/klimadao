import React from "react";

type LinkProps = {
  href: string;
  as?: string;
  replace?: boolean;
  scroll?: boolean;
  shallow?: boolean;
  passHref?: boolean;
  prefetch?: boolean;
  locale?: string | false;
};

export type Link = (
  props: React.PropsWithChildren<LinkProps>
) => React.DetailedReactHTMLElement<
  {
    onMouseEnter?: React.MouseEventHandler<Element> | undefined;
    onClick: React.MouseEventHandler;
    href?: string | undefined;
  },
  HTMLElement
>;
