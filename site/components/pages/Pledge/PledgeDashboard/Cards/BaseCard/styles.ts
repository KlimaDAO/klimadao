import { css } from "@emotion/css";
import * as common from "@klimadao/lib/theme/common";

export const cardHeader = css`
  display: flex;
  flex-direction: row;
  gap: 0.8rem;
  align-items: center;

  p {
    text-transform: uppercase;
  }

  svg {
    fill: var(--font-01);
  }
`;

export const card = css`
  ${common.cardSurface}
  display: flex;
  flex-direction: column;
  align-content: start;
`;
