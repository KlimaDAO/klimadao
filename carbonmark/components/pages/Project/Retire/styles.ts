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

export const loginButton = css`
  display: none;
  ${breakpoints.desktop} {
    display: flex;
    flex-direction: row-reverse;
  }
`;

export const backToProjectButton = css`
  align-items: center;
  margin-top: 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: min-content;
  width: min-content;
  a {
    white-space: nowrap;
  }
  ${breakpoints.desktop} {
    justify-content: center;
    height: 4.8rem;
    width: 21rem;
    border: 1px solid var(--font-01);
    border-radius: 0.4rem;
  }
`;

export const backToResults = css`
  color: var(--font-01) !important;

  svg {
    margin-right: 0.8rem;
  }
`;
