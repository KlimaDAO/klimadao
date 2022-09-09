import { css } from "@emotion/css";

export const resourcesListContainer = css`
  grid-column: main;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

export const inputsContainer = css`
  grid-column: main;
  display: flex;
  flex-direction: row;
  gap: 2.4rem;
  justify-content: space-between;
`;

export const searchInputContainer = css`
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

  // remove ugly clear icon
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
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

export const sortbyContainer = css`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  align-items: center;
`;

export const main = css`
  display: grid;
  grid-column: main;
  gap: 2.4rem;
  grid-template-columns:
    [sidebar] 1fr
    [list-view] 2fr;
`;

export const list = css`
  padding-bottom: 5rem;
  display: grid;
  row-gap: 4.8rem;
  grid-column: list-view;
`;

export const filtersContainer = css`
  grid-column: sidebar;
`;

export const filtersContainerInner = css`
  background-color: var(--surface-01);
  border-radius: 1rem;
  box-shadow: var(--shadow-07);
  display: grid;
  padding: 1.6rem;
  padding-bottom: 2.4rem;
  gap: 1.8rem;
`;

export const filtersHeader = css`
  display: grid;
  gap: 1.2rem;
`;

export const filtersCheckboxGroup = css`
  display: grid;
  gap: 1.2rem;
  margin-bottom: 1.6rem; ;
`;

export const listContainer = css`
  grid-column: list-view;
`;

export const spinner = css`
  padding: 0 0.8rem;
  display: flex;
  align-items: center;
  min-height: 8rem;
  justify-content: center;
`;
