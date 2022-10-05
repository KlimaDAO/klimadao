import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const contentContainer = css`
  grid-column: main;
  gap: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const pledgeChart = css`
  grid-column: span 2;
`;

export const column = css`
  display: grid;
  gap: 2rem;
  grid-column: span 2;
  align-content: start;

  ${breakpoints.desktop} {
    grid-column: span 1;
  }
`;

export const modalButtons = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-items: space-between;
  gap: 1.2rem;
`;

export const modalMessage = css`
  padding: 2rem 0;
`;
export const lockIcon = css`
  padding-top: 0.4rem;
`;

export const removeTitleContainer = css`
  display: flex;
  padding: 2rem 0;
  gap: 1.2rem;
`;
