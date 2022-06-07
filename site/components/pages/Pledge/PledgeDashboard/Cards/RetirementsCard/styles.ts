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
