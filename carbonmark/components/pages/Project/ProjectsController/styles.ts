import { css } from "@emotion/css";
import { breakpoints } from "@klimadao/lib/theme/breakpoints";

export const main = css`
  display: flex;
  width: 100%;
  > *:not(:nth-last-child(1)) {
    margin-right: 2rem;
  }
`;

export const filterButton = css`
  //Unfortunately button styles win the selector war here
  color: var(--font-inverse-01) !important;
  background: var(--surface-inverse-01);
  @media (max-width: ${breakpoints.medium}px) {
    padding: 0;
    width: 4.8rem;
    min-width: 4.8rem;
    height: 4.8rem;
    span {
      display: none;
    }
  }
`;
