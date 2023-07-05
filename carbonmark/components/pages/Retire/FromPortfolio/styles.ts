import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const cardsList = css`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  justify-content: center;

  ${breakpoints.medium} {
    justify-content: space-evenly;
  }
`;
