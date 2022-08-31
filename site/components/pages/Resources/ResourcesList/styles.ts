import { css } from "@emotion/css";

export const listContainer = css`
  grid-column: main;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const list = css`
  padding-bottom: 5rem;
  display: grid;
  row-gap: 4.8rem;
  grid-column: main;
`;

export const inputsContainer = css`
  display: flex;
`;

export const searchInput = css`
  background-color: var(--surface-01);
  border-radius: 1rem 0 0 1rem;
  border: 0.175rem solid var(--surface-01);

  &:focus,
  &:hover {
    border-color: var(--surface-01);
  }
`;

export const searchInputSubmit = css`
  border-radius: 0 1rem 1rem 0;
  background-color: var(--surface-01);
  padding: 0rem 1.6rem;

  svg {
    fill: var(--font-03);
  }
`;
