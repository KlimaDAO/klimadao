import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const cardsList = css`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;

  ${breakpoints.large} {
    justify-content: space-between;
  }
`;

export const buttonEmptyState = css`
  align-self: flex-start;
`;

export const emptyText = css`
  text-align: center;
  ${breakpoints.desktop} {
    text-align: inherit;
  }
`;
