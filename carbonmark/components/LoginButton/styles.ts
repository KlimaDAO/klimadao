import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const buttons = css`
  display: none;

  ${breakpoints.medium} {
    display: flex;
  }
`;
