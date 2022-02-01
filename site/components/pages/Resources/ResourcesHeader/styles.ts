import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const resourcesHeader = css`
  padding: 10rem 0 5rem;

  display: grid;
  row-gap: 4.8rem;
  grid-column: full;

  grid-template-columns: inherit;

  .resourcesHeader_textGroup {
    grid-column: main;
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 3.2rem;
    padding: 0 2.4rem;
  }

  .resourcesHeader_textGroup h2 {
    text-align: center;
    text-transform: uppercase;
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

export const navigationDesktopWrapper = css`
  grid-column: main;
  display: none;
  position: sticky;
  top: 0px;
  flex-direction: row;
  justify-content: center;
  padding: 0;
  width: 100%;
  z-index: 10;

  display: none;

  ${breakpoints.medium} {
    display: flex;
  }
`;

export const navigationDesktop = css`
  display: none;
  width: 100%;

  ${breakpoints.medium} {
    display: block;
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
  position: absolute;
  margin-top: 8rem;

  min-width: 16rem;

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
