import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const desktopSidebar = css`
  display: none;

  ${breakpoints.desktop} {
    position: fixed;
    width: 220px;
    overflow: auto;
    padding: 48px  20px  48px 20px;
    gap: 40px;
    display: grid;
    text-align: center;
    background-color: var(--surface-04)
  }
  [aria-describedby="title"] {
    padding: 20px 0px 20px 0px;
    border: 1px solid ;
    border-left: none;
    border-right: none;
    border-color: var(--text-color-02);
    color: var(--text-color-01)
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
export const desktopSidebarItem = css`
  width: 180px;
  height: 48px;
  display: flex;
  align-items: center;
  text-align:left;
  color: #767676;
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

export const mobileBottomNav = css`
  position: fixed;
  bottom: 0px;
  display: flex;
  width: 100%;
  background-color: var(--surface-02);
  flex-direction: row;
  justify-content: space-evenly;
  ${breakpoints.desktop} {
    display: none
  }
  > * {
    flex: 1;
  }
`;
export const mobileBottomNavItem = css`
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  &[aria-selected="true"] {
    background-color: var(--surface-02-active);
  }
  
`;
export const content = css`
  margin-left: 0;
  padding: 1px 16px;
  height: 1000px;
  background-color: var(--surface-03);
  ${breakpoints.desktop} {
    margin-left: 220px;
    padding-top: 48px;
  }
  h1 {
    margin-bottom: 26px;
  }
`;
