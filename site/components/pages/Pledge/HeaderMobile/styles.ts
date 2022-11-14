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
  padding: 0 1.6rem;

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
  height: 6.4rem;
  z-index: 1;

  ${breakpoints.large} {
    display: none;
  }
`;

export const mainLogoMobile = css`
  max-width: 12rem;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const navMain_Buttons = css`
  box-sizing: border-box;
  flex: 1 1 0%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 0.4rem;

  ${breakpoints.large} {
    button,
    a {
      box-shadow: var(--shadow-light);
    }
  }
`;

export const themeToggle = css`
  background-color: var(--surface-02);
`;

export const editButton = css`
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  text-decoration: none;
  min-height: 4.8rem;
  min-width: 4.8rem;
  border-radius: var(--border-radius);
  background-color: var(--surface-02);
  transition: opacity 0.3s ease 0s;

  &:hover,
  &:focus {
    opacity: 0.7;
  }

  &:active {
    transform: scale(0.9);
  }

  svg {
    fill: var(--font-01);
    font-size: 2.4rem;
  }

  ${breakpoints.medium} {
    min-height: 4.8rem;
    min-width: 4.8rem;

    svg {
      font-size: 2.8rem;
    }
  }
`;

export const authButton = css`
  padding: 0 1rem;

  ${breakpoints.medium} {
    padding: 0rem 2.4rem;
  }
`;
