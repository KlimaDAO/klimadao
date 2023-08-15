import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const global = css`
  ${breakpoints.desktop} {
    display: flex;
    gap: 20px;
  }
`;
export const mainColumn = css`
  width: 100%;
  flex-grow: 1;
  margin-bottom: 20px;
`;
export const digitalCarbonPricingColumn = css`
  ${breakpoints.desktop} {
    width: 360px;
  }
`;
