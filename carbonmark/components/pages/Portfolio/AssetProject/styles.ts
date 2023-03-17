import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const image = css`
  position: relative;
  overflow: hidden;

  min-height: 12rem;

  ${breakpoints.medium} {
    min-height: 25rem;
  }
`;

export const tags = css`
  display: flex;
  gap: 1.6rem;
  flex-direction: row;
`;

export const buttons = css`
  display: flex;
  gap: 2rem;

  & a {
    color: var(--white);
  }
`;
