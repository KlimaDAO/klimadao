import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const desktopHeader = css`
  display: none;
  text-align: center;
  ${breakpoints.desktop} {
    position: fixed;
    width: 220px;
    overflow: auto;
    padding: 48px  20px  48px 20px;
    gap: 40px;
    display: grid;
  }
  [aria-describedby="logo"] {
  }
  [aria-describedby="title"] {
    border: 1px solid ;
    border-left: none;
    border-right: none;
    height: 60px;
    width: 180px;
    display: grid;
    align-items: center;
    font: Inter;
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;

  }
  [aria-describedby="links"] {
    width: 180px;
    display: grid;
    gap: 16px;
  }
`;
export const sidebarItem = css`
  width: 180px;
  height: 48px;
  display: flex;
  align-items: center;
  text-align:left;
  color: black;
  svg {
    width: 32px;
    height: 32px;
    margin: 8px;
  }
`
export const mobileHeader = css`
  height: 64px;
  display: flex;
  align-items: center;
  padding: 8px 16px 8px 16px;
  justify-content: space-between;

  ${breakpoints.desktop} {
    display: none
  }
`;

export const content = css`
  margin-left: 0;
  padding: 1px 16px;
  height: 1000px;
  ${breakpoints.desktop} {
    margin-left: 200px;
  }
`;
