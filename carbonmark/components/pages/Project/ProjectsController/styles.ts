import { css } from "@emotion/css";
import { breakpoints } from "@klimadao/lib/theme/breakpoints";

export const projectsController = css`
  display: flex;
  gap: 1.6rem;
`;

export const filterButton = css`
  //Unfortunately button styles win the selector war here
  color: white !important;
  background: var(--manatee) !important;
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
