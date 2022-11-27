import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as common from "@klimadao/lib/theme/common";

export const cardHeader = css`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 0.8rem;
  align-items: center;
`;

export const title = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  svg {
    fill: var(--font-01);
    font-size: 3.2rem;
  }
`;

export const card = css`
  ${common.cardSurface}
  display: flex;
  overflow: hidden;
  flex-direction: column;
  align-content: start;
  padding: 1.8rem;

  ${breakpoints.desktop} {
    padding: 2.2rem;
  }
`;
