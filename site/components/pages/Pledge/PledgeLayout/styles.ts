import { css } from "@emotion/css";

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

export const header = css`
  grid-column: span 2;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: space-between;
  align-items: center;
`;

export const logo = css`
  grid-column: span 1;
  max-width: 26rem;
`;

export const group = css`
  grid-column: span 1;
  gap: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;