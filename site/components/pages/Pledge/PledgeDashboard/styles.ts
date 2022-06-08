import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const contentContainer = css`
  grid-column: main;
  gap: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;

export const profile = css`
  grid-column: span 2;
  display: grid;
  gap: 1.6rem;
  justify-items: center;
  padding: 6rem 0 2rem 0;

  .profileImage {
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: cover;
    width: 12rem;
    height: 12rem;
    background-color: var(--surface-02);
    border-radius: 50%;
    border: 0.1rem solid var(--surface-01);
  }

  ${breakpoints.desktop} {
    gap: 2rem;
  }
`;

export const pledgeChart = css`
  grid-column: span 2;
`;

export const progressContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.6rem;
`;

export const pledgeProgress = css`
  text-align: center;
  align-self: center;
  color: var(--klima-green);
  padding: 1.2rem;
  border: 0.1rem solid var(--klima-green);
  border-radius: var(--border-radius);
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
