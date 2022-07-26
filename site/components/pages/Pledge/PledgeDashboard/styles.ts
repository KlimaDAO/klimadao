import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const contentContainer = css`
  grid-column: main;
  gap: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const pledgeChart = css`
  grid-column: span 2;
`;

export const column = css`
  display: grid;
  gap: 2rem;
  grid-column: span 2;
  align-content: start;

  ${breakpoints.desktop} {
    grid-column: span 1;
  }
`;
