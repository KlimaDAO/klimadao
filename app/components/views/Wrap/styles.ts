import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const wrapCard = css`
  grid-row: auto;
  ${breakpoints.desktop} {
    grid-row: 1 / span 3 !important;
  }
`;
