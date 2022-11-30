import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

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
  cursor: pointer;

  &:disabled {
    opacity: 50%;
    cursor: not-allowed;
  }
`;

export const addListingButtonText = css`
  display: none;
  ${breakpoints.medium} {
    display: block;
  }
`;

export const addListingButtonIcon = css`
  svg {
    width: 2rem;
    height: 2rem;
  }
  ${breakpoints.medium} {
    display: none;
  }
`;

export const errorMessage = css`
  color: var(--warn);
  margin-bottom: 0.2rem;
  word-break: break-word;
`;

export const loadingText = css`
  display: flex;
  gap: 1.2rem;
  color: var(--klima-green);
  align-items: center;
`;
