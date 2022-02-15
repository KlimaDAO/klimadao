import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const text = css`
  grid-column: main;
  display: grid;
  gap: 2.8rem;
  ${breakpoints.medium} {
    gap: 5.2rem;
  }
`;

export const textGroup = css`
  display: flex;
  flex-direction: column;
  gap: 2.8rem;
  max-width: 64rem;
  justify-self: center;
  align-self: center;
`;
