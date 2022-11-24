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
