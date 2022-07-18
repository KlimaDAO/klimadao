import { css } from "@emotion/css";

export const container = css`
  grid-template-columns:
    [full-start] minmax(0.8rem, 1fr)
    [main-start] minmax(0, 70rem)
    [main-end] minmax(0.8rem, 1fr)
    [full-end];
  display: grid;
  padding-top: 0 !important;
`;

export const cardsSection = css`
  grid-column: main;
  padding-bottom: 5rem;
  row-gap: 2.4rem;
`;

export const articles = css`
  grid-column: main;
  text-transform: uppercase;
  padding-bottom: 2.4rem;
`;

export const cards = css`
  display: grid;
  row-gap: 4.8rem;
  grid-column: main;
`;
