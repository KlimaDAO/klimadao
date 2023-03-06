import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  grid-column: full;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 2.4rem;
  ${breakpoints.desktop} {
    grid-column: main;
  }
`;

export const userControlsRow = css`
  grid-column: 1/3;
  display: grid;
  grid-template-columns: auto;
  justify-content: flex-end;
  gap: 1.6rem;
  .loginButton {
    display: none;
  }
  ${breakpoints.desktop} {
    grid-template-columns: auto auto;
    .loginButton {
      display: initial;
    }
  }
`;

export const fullWidth = css`
  grid-column: 1/3;
`;

export const listings = css`
  grid-column: 1/3;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const listingsHeader = css`
  display: grid;
  gap: 1.2rem;
  grid-auto-rows: min-content;
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

export const errorMessageWrap = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.8rem;
`;

export const errorMessage = css`
  color: var(--warn);
  margin-bottom: 0.2rem;
  word-break: break-word;
`;

export const spinnerContainer = css`
  min-height: 20rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const editListingButton = css`
  ${breakpoints.large} {
    align-self: flex-start;
  }
`;

export const deleteListingButton = css`
  border-color: var(--warn);
  color: var(--warn) !important;
  width: 100%;
  margin-top: 1.6rem;
`;
