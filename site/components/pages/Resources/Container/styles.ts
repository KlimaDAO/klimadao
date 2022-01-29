import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const layoutDesktop = css`
  grid-column: full;
  display: none;
  position: sticky;
  top: 0;
  flex-direction: row;
  justify-content: center;
  padding: 0rem 3.4rem;
  width: 100%;
  ${breakpoints.medium} {
    display: flex;
  }
`;

export const layoutMobile = css`
  grid-column: full;
  display: flex;
  flex-direction: column;
  margin-bottom: 4rem;
  ${breakpoints.medium} {
    display: none;
  }
`;

export const mobileNav = css`
  display: flex;
  flex-direction: row;
  width: 100%;

  & > * {
    flex: 1;
  }
`;

export const mobileNavButton = css`
  font-size: 1.4rem;
  font-weight: 400;
`;

export const mobileNavContent = css`
  display: flex;
  flex: 10;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

export const spacing = css`
  width: 100%;
  max-width: var(--site-max-width);
`;

export const resourcesNavigation = css`
  position: absolute;
  margin-top: 8rem;
`;

export const list = css`
  list-style: none;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 0.5rem;
  width: 16rem;
  height: 14rem;
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

export const listItemActive = css``;
