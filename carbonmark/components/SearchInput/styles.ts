import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const input = css`
  // This is to override safari's rounded corners behaviour
  -webkit-border-radius: 0;
  -webkit-appearance: none;
  background: var(--surface-01);
  border: unset;
  border-radius: var(--border-radius) 0 0 var(--border-radius);
  width: 100%;
`;

export const main = css`
  display: flex;
  width: 100%;
  background-color: white;
  border-radius: var(--border-radius);

  ${breakpoints.medium} {
    width: 40rem;
    max-width: 48rem;
  }

  // Not great but we need to force the div "container" element
  // in InputField to fill available space
  div {
    width: 100%;
  }
  // Remove all webkit noise
  input[type="search"]::-webkit-search-decoration,
  input[type="search"]::-webkit-search-cancel-button,
  input[type="search"]::-webkit-search-results-button,
  input[type="search"]::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
`;

export const button = css`
  padding: 1.4rem;
  border-radius: var(--border-radius);
  color: white;
  background-color: var(--manatee) !important;
  svg {
    font-size: 2rem;
  }
`;
