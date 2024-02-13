import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const pageWrapper = css`
  display: unset;
`;

export const sectionHead = css`
  padding: 12rem 0rem 6rem 0rem !important;

  ${breakpoints.medium} {
    padding: 12rem 0rem 8.4rem 0rem !important;
  }

  ${breakpoints.desktopLarge} {
    padding: 8.4rem 0rem 8.4rem 0rem !important;
  }
`;

export const header = css`
  grid-column: main;
  display: flex;
  align-items: center;
  gap: 3.2rem;
  max-width: 62rem;
  justify-self: center;
  flex-direction: column;
`;
