import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const resourcesHeader = css`
  padding: 10rem 0 5rem;

  display: grid;
  row-gap: 4.8rem;
  grid-column: full;

  grid-template-columns: inherit;

  .resourcesHeader_textGroup {
    display: grid;
    flex-wrap: wrap;
    grid-column: main;
    gap: 3.2rem;
    padding: 0 2.4rem;
  }

  .resourcesHeader_textGroup h2 {
    text-align: center;
  }

  ${breakpoints.medium} {
    grid-column: main;

    grid-template-columns:
      [header_full-start] minmax(20rem, 1fr)
      [header_inner-start] minmax(0, 107.2rem)
      [header_inner-end] minmax(20rem, 1fr)
      [header_full-end];

    gap: 2.5rem;

    .resourcesHeader_textGroup {
      padding: 0 2rem;
      grid-column: header_inner;
    }
  }
`;

export const navigationDesktop = css`
  display: none;

  ${breakpoints.medium} {
    display: block;
    grid-column: header_full-start;
  }
`;

export const navigationMobile = css`
  grid-column: full;
  padding: 0 1rem;

  display: flex;
  gap: 2rem;
  justify-content: space-between;

  .navigationMobile_navItem {
    flex: 1;
  }

  ${breakpoints.medium} {
    display: none;
  }
`;

export const list = css`
  list-style: none;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: 0 0.4rem 2.8rem rgba(0, 0, 0, 0.06);

  li[data-active="true"] {
    background-color: #fafafa;
    border-radius: 4px;

    a {
      color: var(--font-01);
      font-weight: 600;
      justify-content: space-between;
      width: 100%;

      .arrow {
        display: block;
      }
    }
  }
`;

export const listItem = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 4.4rem;
  padding: 1.2rem;
  font-size: 1.6rem;

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #6e6e6e;
    text-transform: capitalize;

    .arrow {
      display: none;
    }
  }
`;
