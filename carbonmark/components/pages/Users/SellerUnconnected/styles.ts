import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 2.4rem;
`;

export const fullWidth = css`
  grid-column: 1/3;
`;

export const listings = css`
  grid-column: 1/3;
  display: flex;
  justify-content: space-between;
`;

export const listingsHeader = css`
  display: grid;
  gap: 1.2rem;
  grid-auto-rows: min-content;
`;

export const buyButton = css`
  ${breakpoints.large} {
    align-self: flex-start;
  }
`;
