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
    width: auto;
    height: auto;
    padding: 0 2rem;
    span {
      display: block;
    }
  }
`;

export const resetFilterButton = css`
  display: none;
  ${breakpoints.medium} {
    display: flex !important;
  }
`;
