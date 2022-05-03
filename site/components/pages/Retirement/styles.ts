import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const section = css`
  ${breakpoints.medium} {
    padding-top: 9.6rem;
    padding-bottom: 10rem;
  }
`;

export const retirementContainer = css`
  grid-column: main;
  display: grid;
  gap: 2.8rem;
  ${breakpoints.medium} {
    gap: 5.2rem;
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
