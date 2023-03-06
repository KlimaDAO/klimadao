import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const portfolioControls = css`
  grid-column: main;
  flex-direction: row-reverse;
  display: none;

  ${breakpoints.desktop} {
    display: flex;
  }
`;

export const portfolioContent = css`
  grid-column: main;
  display: grid;
  gap: 2.4rem;
  ${breakpoints.desktop} {
    grid-template-columns: 2fr 1fr;
  }
`;

export const fullWidth = css`
  display: flex;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

export const isLoading = css`
  color: var(--klima-green);
`;

export const errorMessage = css`
  color: var(--warn);
  margin-bottom: 0.2rem;
  word-break: break-word;
`;
