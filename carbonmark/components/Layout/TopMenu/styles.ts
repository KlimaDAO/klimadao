import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const topMenu = css`
  justify-content: space-between;
  min-height: 6.4rem;
  display: flex;
  gap: 0.8rem;
  align-items: center;
  padding: 0 1.6rem;
  background-color: var(--darkmode-surface-01);

  ${breakpoints.desktop} {
    min-height: 7.2rem;
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
