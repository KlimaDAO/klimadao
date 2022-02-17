import React, { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement>;

export const Anchor = (props: Props) => (
  <a target="_blank" rel="noreferrer noopener" {...props}>
    {props.children}
  </a>
);
