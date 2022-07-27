import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const tokenRow = css`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  align-items: center;
  gap: 1rem;

  ${breakpoints.medium} {
    grid-template-columns: minmax(0, 1fr) minmax(20rem, 40%);
    align-items: center;
  }
`;

export const tokenHoldings = css`
  grid-column: 1 / 2;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;

  img {
    width: 4.8rem;
    height: 4.8rem;
  }

  ${breakpoints.medium} {
    grid-column: 1;
  }
`;

export const tokenBalance = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

export const holdingsChart = css`
  grid-column: 1 / 2;
  width: 100%;
  height: 5rem;

  ${breakpoints.medium} {
    grid-column: 2;
  }
`;
