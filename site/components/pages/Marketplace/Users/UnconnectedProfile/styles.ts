import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const fullWidth = css`
  grid-column: 1/3;
`;

export const main = css`
  display: grid;
  gap: 2.4rem;
  grid-column: 1;
`;

export const aside = css`
  display: grid;
  gap: 2.4rem;
  grid-column: 1 / 3;
  ${breakpoints.desktop} {
    grid-column: 2 / 3;
  }
`;
