import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const layout = css`
  flex-direction: row;
  justify-content: center;
  padding: 0rem 3.4rem;
  width: 100%;
  ${breakpoints.medium} {
    display: flex;
  }
`;

export const spacing = css`
  width: 100%;
  max-width: var(--site-max-width);
`;

export const resourcesNavigation = css`
  position: absolute;
  margin-top: 80px;
`;

export const list = css`
  list-style: none;
  background-color: #ffffff;
  border-radius: 8px;
  padding: 5px;
  width: 160px;
  height: 140px;
  box-shadow: 0px 4px 28px rgba(0, 0, 0, 0.06);
`;

export const listItem = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 44px;
  padding: 12px;
  font-size: 16px;

  a {
    display: flex;
    flex-direction: row;
    align-items: center;
    color: #6e6e6e;
    text-transform: capitalize;
  }
`;

export const listItemActive = css`
  background-color: #fafafa;
  border-radius: 4px;

  a {
    color: var(--headings-color);
    font-weight: 600;
    justify-content: space-between;
    width: 100%;
  }
`;
