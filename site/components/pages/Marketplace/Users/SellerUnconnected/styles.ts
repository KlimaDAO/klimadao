import { css } from "@emotion/css";

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
