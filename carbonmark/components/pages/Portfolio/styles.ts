import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  grid-column: main;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 2.4rem;
`;

export const portfolioControls = css`
  grid-column: main;
  flex-direction: row-reverse;
  display: none;

  ${breakpoints.desktop} {
    display: flex;
  }
`;

export const errorMessage = css`
  color: var(--warn);
  margin-bottom: 0.2rem;
  word-break: break-word;
`;

export const loadingOverlay = css`
  pointer-events: none;
  opacity: 0.5;
`;

export const spinnerContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const stickyContentWrapper = css`
  display: grid;
  gap: 2.4rem;
  position: sticky;
  top: 1rem;
`;
