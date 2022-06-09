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

export const headerContainer = css`
  grid-column: main;
`;
