import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

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
  -webkit-appearance: none; // remove default border radius for iOS
  border-radius: 1rem;
  border: 0.175rem solid var(--surface-01);

  &:focus,
  &:hover {
    border-color: var(--klima-green);
  }

  // remove ugly clear icon
  &::-webkit-search-decoration,
  &::-webkit-search-cancel-button,
  &::-webkit-search-results-button,
  &::-webkit-search-results-decoration {
    -webkit-appearance: none;
  }
`;

export const showOnSmallScreens = css`
  ${breakpoints.large} {
    display: none;
  }
`;

export const showOnBigScreens = css`
  display: none;
  ${breakpoints.large} {
    display: block;
  }
`;

export const sortbyContainer = css`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  align-items: center;
`;

export const toggleMobileModalButton = css`
  background-color: var(--surface-01);

  svg {
    fill: var(--font-01);
  }

  ${showOnSmallScreens}
`;

export const sortBySelectContainer = css`
  display: none;

  ${breakpoints.large} {
    display: flex;
    flex-direction: row;
    gap: 1.2rem;
    align-items: center;
  }
`;

export const sortByButtons = css`
  display: flex;
  padding-top: 2rem;
  padding-bottom: 4rem;
  justify-content: start;
  gap: 1.6rem;

  ${breakpoints.large} {
    justify-content: space-between;
  }
`;

export const main = css`
  display: grid;
  grid-column: main;
  gap: 2.4rem;

  ${breakpoints.large} {
    grid-template-columns:
      [sidebar] 1fr
      [list-view] 2fr;
  }
`;

export const filtersContainer = css`
  grid-column: sidebar;
  ${showOnBigScreens}
`;

export const listContainer = css`
  ${breakpoints.large} {
    grid-column: list-view;
  }
`;

export const list = css`
  padding-bottom: 5rem;
  display: grid;
  row-gap: 4.8rem;
  grid-column: list-view;
`;

export const spinner = css`
  padding: 0 0.8rem;
  display: flex;
  align-items: center;
  min-height: 8rem;
  justify-content: center;
`;

export const showResultsButton = css`
  width: 100%;
`;
