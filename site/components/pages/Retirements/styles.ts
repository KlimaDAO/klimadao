import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const section = css`
  ${breakpoints.medium} {
    padding-top: 9rem;
    padding-bottom: 9rem;
  }
`;

export const retirementContent = css`
  background-color: var(--surface-01);
  border-radius: 0 0 1.2rem 1.2rem;
  grid-column: main;
  display: grid;
  gap: 2.8rem;
  padding: 2.8rem 1.5rem;

  ${breakpoints.medium} {
    gap: 5.2rem;
    padding: 5.2rem;
  }
`;

export const retirement_textGroup = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2.8rem;
  p {
    max-width: 57rem;
  }
`;
