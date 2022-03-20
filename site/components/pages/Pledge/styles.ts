import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as common from "@klimadao/lib/theme/common";

export const container = css`
  grid-column: full;
  height: 100vh;
  display: grid;
  align-content: start;
  grid-template-columns: inherit;
  padding: 4rem 0;
  background-color: var(--surface-01);
`;

export const contentContainer = css`
  grid-column: main;
  gap: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const header = css`
  grid-column: span 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const logo = css`
  max-width: 26rem;
`

export const cardHeader = css`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: center;

  p {
    text-transform: uppercase;
  }

  svg {
    fill: var(--font-01);
  }
`

export const card = css`
  ${common.cardSurface}
  display: flex;
  flex-direction: column;
  align-content: start;

  height: 200px; // temp
`;

export const icon = css`
  background-color: var(--font-02);
`;

export const profile = css`
  grid-column: span 2;
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
