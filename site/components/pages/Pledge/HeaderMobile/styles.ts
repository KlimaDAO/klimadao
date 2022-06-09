import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

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

  ${breakpoints.large} {
    display: none;
  }
`;

export const headerMobile = css`
  position: relative;
  background-color: var(--surface-01);
  pointer-events: all;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 6rem;
  z-index: 1;

  ${breakpoints.large} {
    display: none;
  }
`;

export const mainLogoMobile = css`
  max-width: 12rem;
  padding: 0 2.4rem;
`;

export const navMain_Buttons = css`
  box-sizing: border-box;
  flex: 1 1 0%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1rem;

  ${breakpoints.large} {
    button,
    a {
      box-shadow: var(--shadow-light);
    }
  }
`;