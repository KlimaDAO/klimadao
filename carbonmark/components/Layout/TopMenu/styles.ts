import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const topMenu = css`
  justify-content: space-between;
  flex: 0 0 6.4rem;
  min-height: 6.4rem;
  display: flex;
  grid-area: nav;
  gap: 0.8rem;
  align-items: center;
  padding: 0 1.6rem;
  background-color: var(--darkmode-surface-01);

  ${breakpoints.desktop} {
    flex-basis: 7.2rem;
  }

  [data-tippy-root] {
    z-index: 101 !important;
  }
`;

export const loginButton = css`
  width: 24rem;
  background: #fff !important;
  font-weight: 600 !important;
  color: var(--bright-blue) !important;
`;

export const navButtons = css`
  gap: 1rem;
  display: flex;
  justify-content: flex-end;

  .user-profile {
    display: flex;
  }
`;

export const betaBadge = css`
  display: none;
  ${breakpoints.large} {
    display: unset;
  }
`;

// TODO: with emotion/cx we shouldn't need !important. yet we do.
export const searchButton = css`
  background-color: var(--yellow) !important;
  color: var(--lightmode-font-01) !important;
`;

export const menuButton = css`
  background-color: white;
  color: var(--lightmode-font-01);
  width: 4.8rem;
  height: 4.8rem;
`;

export const logo = css`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  > :nth-child(2),
  > :nth-child(3) {
    display: none;
  }

  ${breakpoints.desktop} {
    > :nth-child(2),
    > :nth-child(3) {
      display: inline-block;
    }
  }
`;
