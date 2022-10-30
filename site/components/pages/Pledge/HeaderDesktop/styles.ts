import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const headerDesktop = css`
  display: none;

  ${breakpoints.large} {
    grid-column: span 2;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    justify-content: space-between;
    align-items: center;
  }
`;

export const mainHeader = css`
  grid-column: span 1;
  display: flex;
  align-items: center;
  gap: 1.6rem;
`;

export const logo = css`
  max-width: 26rem;
`;

export const themeToggle = css`
  background-color: var(--surface-02);
`;

export const rightGroup = css`
  grid-column: span 1;
  gap: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
