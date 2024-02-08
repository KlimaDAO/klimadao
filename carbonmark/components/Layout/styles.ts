import { css } from "@emotion/css";
import breakpoints, {
  breakpoints as specificBreakpoints,
} from "@klimadao/lib/theme/breakpoints";

export const container = css`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  background-color: var(--surface-02);
  min-height: 100vh;
  position: relative;
  justify-content: space-between;

  &[data-scroll-lock="true"] {
    overflow-y: hidden;
    max-height: 100vh;
  }
  ${breakpoints.desktop} {
    max-height: 100vh;
    // overflow-y: hidden;
  }
  ${breakpoints.desktopLarge} {
    max-height: 100vh;
    // overflow-y: hidden;
  }
`;

export const mobileLogo = css`
  margin-right: auto;
  height: min-content;
  svg {
    max-height: 5rem;
    width: 100%; // make logo auto increase
    max-width: 5rem;
  }
`;

export const layoutChildrenContainer = css`
  width: 100%;
  height: 100vh; // todo - fix footer missing for marketplace page
  gap: 1.2rem 0rem;
  display: flex;
  padding: 1.6rem;
  flex-direction: column;

  ${breakpoints.desktop} {
    padding: 2rem 2.4rem;
  }

  ${breakpoints.desktopLarge} {
    margin: 0 auto;
    max-width: 120rem;
  }

  &.fullContentWidth {
    padding: 0;
  }
`;

export const cardGrid = css`
  min-height: 100vh;

  &.fullWidth {
    max-width: unset;
  }
  display: grid;
  /* header body footer  */
  grid-template-rows: auto 1fr auto;
  gap: 1.6rem;
  grid-template-columns: auto 1fr auto;
  align-content: start;
  justify-self: center;
  width: 100%;
  ${breakpoints.small} {
    gap: 2.4rem;
  }
  ${breakpoints.desktop} {
    display: grid;
    grid-column: full;
  }
`;

export const controls = css`
  grid-column: full;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 1.6rem;
  .connectButton {
    white-space: nowrap;
    background-color: var(--bright-blue);
    color: var(--white);
  }
  background-color: var(--surface-01);
  padding: 0.8rem 1.6rem;
  ${breakpoints.desktop} {
    display: none;
  }
`;

export const menuButton = css`
  background-color: var(--surface-02) !important;
  height: 4.8rem;
  width: 4.8rem;
  font-size: 2.4rem !important;
  //unfortunately we need to override the gray variant font color
  color: var(--font-01) !important;
  display: flex;
  justify-content: center;
  align-items: center;
  /** 
   * @todo remove this once rebased with staging to grab the following changes:
   * https://github.com/KlimaDAO/klimadao/pull/882
   */
  border-radius: var(--border-radius) !important;
  &:focus,
  &:hover {
    opacity: 0.7;
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
  transform: translateX(+100vw);
  max-width: 24.4rem;
  ${breakpoints.desktop} {
    display: none;
  }
  &[data-visible="true"] {
    visibility: visible;
    // Compute the width of the nav and subtract it from the viewport width
    transform: translateX(calc(100vw - 100%));
    ${breakpoints.desktop} {
      display: none;
    }
  }
`;

export const global = css`
  [data-mobile-only="true"] {
    ${breakpoints.desktop} {
      display: none;
    }
  }
  [data-desktop-only="true"] {
    @media (max-width: ${specificBreakpoints.desktop}px) {
      display: none;
    }
  }
`;

export const betaWrapperMobile = css`
  display: flex;
  ${breakpoints.desktop} {
    display: none;
  }
`;
