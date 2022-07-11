import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const value = css`
  display: grid;
  gap: 1rem;
`;

export const retirementsLink = css`
  display: flex;
  align-items: center;
  justify-content: center;
  appearance: none;
  text-decoration: none;
  min-height: 4.2rem;
  min-width: 4.2rem;
  border-radius: var(--border-radius);
  background-color: var(--surface-01);
  transition: opacity 0.3s ease 0s;

  &:hover,
  &:focus {
    opacity: 0.7;
  }

  svg {
    fill: var(--font-01);
    font-size: 2.4rem;
  }

  ${breakpoints.medium} {
    min-height: 4.8rem;
    min-width: 4.8rem;

    svg {
      font-size: 2.8rem;
    }
  }
`;

// Retirement chart styles
export const chartContainer = css`
  height: 36rem;
  width: 100%;
`;

export const chart_tooltip = css`
  background-color: var(--surface-01);
  padding: 0.8rem;
  border-radius: 0.6rem;
  border: 0.1rem solid var(--font-03);
`;
