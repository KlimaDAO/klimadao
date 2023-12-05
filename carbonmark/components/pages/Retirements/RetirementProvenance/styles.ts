import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const section = css`
  padding-bottom: 3.6rem;
  ${breakpoints.desktop} {
    padding-top: 6.8rem;
    padding-bottom: 4rem;
  }
`;
