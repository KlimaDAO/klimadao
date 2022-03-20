import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  grid-column: full;
  min-height: 100vh;
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
`;

export const logo = css`
  max-width: 26rem;
`;

export const icon = css`
  background-color: var(--font-02);
`;

export const profile = css`
  grid-column: span 2;
  display: grid;
  gap: 1.6rem;
  justify-items: center;
  padding: 2rem 0;

  .companyLogo {
    display: grid;
    align-items: center;
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: var(--surface-02);
    transition: background-color 0.25s ease-in-out;
  }

  p {
    text-transform: uppercase;
  }
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
