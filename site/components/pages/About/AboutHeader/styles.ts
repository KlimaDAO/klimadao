import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const resourcesHeader = css`
  padding: 10rem 0 5rem;
  display: grid;
  row-gap: 4.8rem;
  grid-column: main;
  .resourcesHeader_textGroup {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.2rem;
    max-width: 62rem;
    justify-self: center;
  }
  .resourcesHeader_textGroup h2 {
    text-align: center;
    text-transform: uppercase;
  }
  ${breakpoints.large} {
    gap: 2.5rem;
    padding: 10rem 16.2rem;
  }
`;

export const navigationDesktopWrapper = css`
  grid-column: main;
  display: none;
  position: sticky;
  top: 0px;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  z-index: 10;
  display: none;
  ${breakpoints.large} {
    display: flex;
  }
`;

export const navigationDesktop = css`
  display: none;
  width: 100%;
  ${breakpoints.large} {
    display: block;
  }
`;

export const navigationMobile = css`
  display: flex;
  gap: 0.8rem;
  justify-content: center;
  flex-wrap: wrap;
  a {
    width: 10rem;
    max-width: 10rem;
    text-transform: none;
  }
  ${breakpoints.small} {
    gap: 1.6rem;
  }
  ${breakpoints.large} {
    display: none;
  }
`;

export const list = css`
  position: absolute;
  margin-top: 8rem;
  min-width: 16rem;
  list-style: none;
  background-color: var(--surface-01);
  border-radius: 8px;
  padding: 0.5rem;
  box-shadow: var(--shadow-light);
  li[data-active="true"] {
    background-color: var(--surface-02);
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
    color: var(--font-03);
    text-transform: capitalize;
    .arrow {
      display: none;
    }
  }
`;
