import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const tokenRow = css`
  display: grid;
  grid-template-columns: 1fr minmax(0, 1fr);
  align-items: center;

  ${breakpoints.desktop} {
  }
`;

export const tokenBalance = css`
  grid-column: 1;
`;

export const holdingsChart = css`
  width: 100%;
  height: 100%;
  grid-column: 2;
`;

export const tokenHoldings = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.3rem;
`;

export const divider = css`
  height: 0.15rem;
  width: 100%;
  opacity: 0.3;
  background-color: var(--font-03);
`;
