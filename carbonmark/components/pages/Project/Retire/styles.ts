import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  grid-column: full;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 2.4rem;
  ${breakpoints.large} {
    grid-column: main;
  }
`;

export const backToProject = css`
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  align-items: center;
  height: min-content;
  width: min-content;
  color: var(--font-01) !important;
  ${breakpoints.desktop} {
    justify-content: center;
    height: 4.8rem;
    width: 21rem;
    border: 1px solid var(--font-01);
    border-radius: 0.4rem;
  }
`;
