import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const wrapper = css`
  grid-column: 1/3;
  gap: 2rem;
  display: grid;
  ${breakpoints.large} {
    grid-template-columns: 2fr 1fr;
  }
`;

export const col = css`
  display: grid;
  gap: 2.4rem;
  grid-auto-rows: min-content;
`;
