import { css } from "@emotion/css";

export const container = css`
  grid-column: full;
  background-color: var(--surface-02);
  color: var(--font-01);
  display: grid;
  grid-template-columns:
    [full-start] minmax(0.8rem, 1fr)
    [main-start] minmax(0, 70rem)
    [main-end] minmax(0.8rem, 1fr)
    [full-end];
  grid-gap: 1.6rem;
  .cardsSection {
    display: grid;
    grid-column: main;
    padding-bottom: 5rem;
    row-gap: 2.4rem;
  }

  .articles {
    grid-column: main;
    text-transform: uppercase;
  }

  .cards {
    display: grid;
    row-gap: 4.8rem;
    grid-column: main;
  }
`;
