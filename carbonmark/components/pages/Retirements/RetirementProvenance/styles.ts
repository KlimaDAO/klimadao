import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const section = css`
  padding-bottom: 3.6rem;
  display: flex;
  justify-content: center;
  ${breakpoints.desktop} {
    padding-top: 6.8rem;
    padding-bottom: 4rem;
  }
`;
