import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const desktopSidebar = css`
  display: none;

  ${breakpoints.desktop} {
    position: fixed;
    width: 180px;
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
    border-color: var(--text-color-03);
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
    padding-bottom: 40px;
    border-bottom: 1px solid var(--text-color-03);
  }
`;
export const desktopSidebarItem = css`
  width: 180px;
  height: 48px;
  padding: 8px;
  display: flex;
  align-items: center;
  text-align: left;
  text-decoration: none;
  gap: 12px;
  color: #767676;

  &[aria-selected="true"] {
    background-color: var(--surface-01);
    border-radius: 8px;
    color: var(--text-color-01);

    /**
     * @todo this is kinda hacky */
    span {
      background-color: var(--text-color-05);
      color: var(--text-color-04);
    }
  }
`;

export const desktopSidebarIcon = css`
  border-radius: 6px;
  background-color: var(--surface-01);
  color: var(--text-color-01);
  width: 32px;
  height: 32px;
  svg {
    width: 20px;
    height: 20px;
    margin: 6px;
  }
`;

export const mobileHeader = css`
  height: 64px;
  display: flex;
  align-items: center;
  padding: 8px 16px 8px 16px;
  justify-content: space-between;

  ${breakpoints.desktop} {
    display: none;
  }
`;

export const mobileNavButtons = css`
  display: flex;
  gap: 16px;
`;

export const mobileBottomNav = css`
  height: 44px;
  position: fixed;
  bottom: 0px;
  display: flex;
  width: 100%;
  background-color: var(--surface-02);
  flex-direction: row;
  justify-content: space-evenly;
  ${breakpoints.desktop} {
    display: none;
  }
  > * {
    flex: 1;
  }
`;
export const mobileBottomNavItem = css`
  display: flex;
  justify-content: center;
  align-items: center;
  &[aria-selected="true"] {
    background-color: var(--surface-02-active);
    color: var(--text-color-05);
  }
  color: var(--text-color-02);
`;

export const main = css`
  padding: 0 16px;
  flex: 1;
`;

export const content = css`
  display: flex;
  flex-direction: column;
  margin-left: 0;
  height: 100dvh;
  background-color: var(--surface-03);
  ${breakpoints.desktop} {
    margin-left: 220px;
  }
  h1 {
    margin-top: 46px;
    margin-bottom: 26px;
  }
`;

export const mobileMenuButton = css`
  min-width: 48px;
  min-height: 48px;
  width: 48px;
  height: 48px;
  color: var(--text-color-01);
  background-color: var(--surface-01);
  svg {
    width: 24px;
    height: 24px;
  }
`;

export const footer = css`
  background-color: var(--surface-05);
  color: var(--text-color-04);
  height: 116px;

  display: flex;
  place-items: center;
  justify-content: space-between;
  padding: 0 48px;

  a {
    text-decoration: none;
    color: var(--text-color-04);
  }
`;

export const footerNavLinks = css`
  display: flex;
  align-items: flex-start;
  gap: 32px;
  font-size: 0.875rem;

  a {
    white-space: nowrap;
  }
`;

export const footerSocialLinks = css`
  display: flex;
  gap: 16px;
  place-items: center;
  justify-content: center;
`;
