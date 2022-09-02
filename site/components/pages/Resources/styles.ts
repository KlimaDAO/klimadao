import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const sectionHead = css`
  padding: 8.4rem 0rem 4rem 0 !important;
  ${breakpoints.medium} {
    padding: 8.4rem 0rem !important;
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

export const list = css`
  padding-bottom: 5rem;
  display: grid;
  row-gap: 4.8rem;
  grid-column: main;
`;
