import { css } from "@emotion/css";
import breakpoints from "../../theme/breakpoints";

export const headerDesktop = css`
  display: none;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 64px;
  padding: 0rem 3.4rem;
  background: var(--background);
  ${breakpoints.medium} {
    display: flex;
  }
`;

export const headerMobileWrap_toggled = css`
  position: fixed;
  pointer-events: all;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.5);
  transition: background-color 0.5s ease 0s;
  z-index: 100;
  ${breakpoints.medium} {
    display: none;
  }
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
  ${breakpoints.medium} {
    display: none;
  }
`;

export const headerMobile = css`
  position: relative;
  background-color: var(--white);
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 2.4rem;
  height: 64px;
  z-index: 1;
  ${breakpoints.medium} {
    display: none;
  }
`;

export const menuDesktop = css`
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  max-width: 1800px;
`;

export const logo_Desktop = css`
  flex: 1 1 0%;
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  padding: 2rem;
  padding-left: 0;
`;

export const navMain_Desktop = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding-top: 2px;
  font-size: 12px;
  flex: 0 0 auto;
`;

export const navMain_DesktopLink = css`
  text-decoration: none;
  padding: 0px 20px;
  font-weight: bold;
  color: var(--surface);
  display: flex;
  align-items: center;
`;

export const navMain_Buttons = css`
  box-sizing: border-box;
  flex: 1 1 0%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
