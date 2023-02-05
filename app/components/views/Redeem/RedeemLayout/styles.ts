import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const columnRight = css`
  display: grid;
  gap: 2.4rem;
  grid-column: 1 / 3;
  align-content: start;
  ${breakpoints.desktop} {
    grid-column: 2 / 3;
  }
`;

export const redeemCard = css`
  display: grid;
  background-color: var(--surface-02);
  align-content: start;
  border-radius: 1.2rem;
  padding: 1.6rem;
  gap: 2.4rem;
  grid-column: 1 / 3;

  ${breakpoints.desktop} {
    grid-column: cardsleft;
    grid-row: 2 / auto;
    gap: 4.8rem;
    align-items: start;
  }

  ${breakpoints.desktopLarge} {
    padding: 3.2rem;
  }
`;

export const redeemCard_header = css`
  display: grid;
  gap: 0.8rem;
  max-width: 38rem;
`;

export const redeemCard_header_title = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
