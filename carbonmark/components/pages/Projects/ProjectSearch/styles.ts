import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const projectsController = css`
  display: flex;
  gap: 1.2rem;
`;

export const filterButton = css`
  // Unfortunately button styles win the selector war here
  padding: 0;
  color: white !important;
  width: 4.8rem;
  height: 4.8rem;
  min-width: 4.8rem;
  background: var(--manatee) !important;
  span {
    display: none;
  }

  ${breakpoints.medium} {
    height: fit-content;
    width: fit-content;
    padding: 0 2rem;
    span {
      display: block;
      width: max-content;
    }
  }
`;

export const resetFilterButton = css`
  display: none;
  ${breakpoints.medium} {
    min-width: 15rem;
    display: flex !important;
    padding: 0 2rem;
  }
`;
