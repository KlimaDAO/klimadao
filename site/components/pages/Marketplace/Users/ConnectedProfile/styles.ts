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

export const formContainer = css`
  margin-top: 2rem;
  overflow: hidden;
  display: grid;
  align-content: start;
  gap: 1.6rem;
  overflow: hidden;

  .error {
    color: var(--warn);
  }
`;

export const inputsContainer = css`
  display: grid;
  align-content: start;
  gap: 1.6rem;
  overflow: hidden;
`;

export const createListingButton = css`
  border-color: var(--font-01);
  color: var(--font-01) !important;
`;
