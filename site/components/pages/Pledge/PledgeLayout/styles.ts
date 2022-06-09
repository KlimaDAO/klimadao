import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const pageContainer = css`
  grid-column: full;
  min-height: 100vh;
  display: grid;
  align-content: start;
  grid-template-columns: inherit;
  padding: 4rem 0;
  background-color: var(--surface-01);
`;

export const contentContainer = css`
  grid-column: main;
`;

export const headerBar = css`
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

export const betaBadge = css`
  color: var(--klima-green);
  padding: 0.4rem;
  border: 0.1rem solid var(--klima-green);
  border-radius: var(--border-radius);
`;

export const themeToggle = css`
  background-color: var(--surface-02);
`;

export const group = css`
  grid-column: span 1;
  gap: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;
