import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  position: relative; /* new stacking context */
  z-index: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: var(--surface-01);
  display: grid;
  align-content: flex-start;
  min-height: 100vh;
  grid-template-rows: 1fr;
  .MuiSvgIcon-root {
    font-size: 2rem;
    width: 2rem;
    height: 2rem;
  }
  &[data-scroll-lock="true"] {
    overflow-y: hidden;
    max-height: 100vh;
  }
  ${breakpoints.desktop} {
    max-height: 100vh;
    overflow-y: hidden;
    display: grid;
    grid-template-columns:
      [sidebar] 24.4rem
      [full-start] minmax(0px, 1fr)
      [full-end];
  }
  ${breakpoints.desktopLarge} {
    max-height: 100vh;
    overflow-y: hidden;
    display: grid;
    grid-template-columns:
      [sidebar] 28.4rem
      [full-start] minmax(0px, 1fr)
      [full-end];
  }
  // safari and chrome
  *::-webkit-scrollbar {
    width: 0.6rem;
  }

  *::-webkit-scrollbar-thumb {
    background-color: var(--dark-gray);
    outline: 1px solid var(--dark-gray);
    border-radius: 0.2rem;
    width: 0.6rem;
  }

  //firefox scrollbar
  scrollbar-color: var(--dark-gray);
  scrollbar-width: 0.6rem;
`;

export const desktopNavMenu = css`
  display: none;
  ${breakpoints.desktop} {
    display: flex;
    z-index: 1;
  }
`;

export const cardGrid = css`
  display: grid;
  gap: 1.6rem;
  padding: 1.6rem;
  align-content: start;
  max-width: 64rem;
  justify-self: center;
  width: 100%;
  ${breakpoints.small} {
    gap: 2.4rem;
    padding: 2.4rem;
  }
  ${breakpoints.medium} {
    gap: 2.4rem;
    padding: 2.4rem;
  }
  ${breakpoints.desktop} {
    overflow-y: auto;
    display: grid;
    grid-column: full;
    grid-template-columns:
      [cardsleft] minmax(38rem, auto)
      [cardsright] minmax(auto, 38rem);
    grid-template-rows: min-content 1fr 1fr 1fr;
    max-width: unset;
  }
`;

export const controls = css`
  display: flex;
  justify-content: flex-end;
  gap: 1.6rem;
  grid-column: 1 / 3;
  ${breakpoints.desktop} {
    grid-column: cardsright;
  }
`;

export const menuButton = css`
  background-color: var(--surface-02);
  min-height: 4.8rem;
  min-width: 4.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.8rem;
  margin-right: auto;
  &:focus,
  &:hover {
    opcaity: 0.7;
  }
  ${breakpoints.desktop} {
    display: none;
  }
`;
export const mobileNavMenu_overlay = css`
  z-index: 2;
  visibility: hidden;
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background-color: #0e0e0e;
  opacity: 0;
  transition: all 0.4s ease-out;
  ${breakpoints.desktop} {
    display: none;
  }
  &[data-visible="true"] {
    visibility: visible;
    opacity: 0.4;
    ${breakpoints.desktop} {
      display: none;
    }
  }
`;
export const mobileNavMenu = css`
  position: absolute;
  visibility: hidden;
  z-index: 2;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  transition: all 0.4s ease-out;
  transform: translateX(-100%);
  max-width: 24.4rem;
  ${breakpoints.desktop} {
    display: none;
  }
  &[data-visible="true"] {
    visibility: visible;
    transform: translateX(0%);
    ${breakpoints.desktop} {
      display: none;
    }
  }
`;
