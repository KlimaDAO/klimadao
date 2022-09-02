import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const headerDesktop = css`
  display: none;
  grid-template-columns: inherit;
  grid-column: full;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background: var(--surface-02);
  padding-top: 3.6rem;
  height: var(--header-height);
  z-index: 10; /* so the drop-shadow is visible over next section, 10 to make opened Translation menu flow over main content */

  ${breakpoints.desktop} {
    display: grid;
  }
`;

export const menuDesktop = css`
  display: grid;
  grid-column: main;
  grid-template-columns: auto 1fr auto;
  width: 100%;
  align-items: center;
  z-index: 99;
`;

export const headerTransparentDesktop = css`
  ${headerDesktop}
  background: transparent !important;
`;

export const headerMobileWrap = css`
  position: fixed;
  pointer-events: none;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0);
  transition: background-color 0.5s ease 0s;
  z-index: 100;
  ${breakpoints.desktop} {
    display: none;
  }
`;

export const headerMobileWrap_toggled = css`
  ${headerMobileWrap};
  pointer-events: all;
`;

export const headerMobile = css`
  position: relative;
  background-color: var(--surface-01);
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: var(--header-height);
  z-index: 1;
  padding: 0 1.6rem;
  ${breakpoints.desktop} {
    display: none;
  }
`;

export const mainLogoMobile = css`
  padding: 0 1rem;
`;

export const navMain_Desktop = css`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0 0.8rem;
`;

export const navMain_DesktopLink = css`
  text-decoration: none;
  padding: 0 2rem;
  font-weight: bold;
  color: var(--font-01);
  display: flex;
  align-items: center;
`;

export const navMain_Buttons = css`
  box-sizing: border-box;
  flex: 1 1 0%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;

  ${breakpoints.desktop} {
    button,
    a {
      box-shadow: var(--shadow-light);
    }
  }
`;
