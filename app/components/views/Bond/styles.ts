import { css } from "@emotion/css";
import * as typography from "@klimadao/lib/theme/typography";
import * as common from "@klimadao/lib/theme/common";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const bondCard = css`
  position: relative;
  display: grid;
  background-color: var(--surface-02);
  border-radius: 1.2rem;
  padding: 2.4rem;
  gap: 2.4rem;
  align-content: start;

  .hr {
    height: 2px;
    background-color: var(--surface-01);
  }

  ${breakpoints.medium} {
    gap: 3.2rem;
  }

  ${breakpoints.desktop} {
    grid-column: cardsleft;
    grid-row: 2 / span 3;
    gap: 4.8rem;
    grid-template-rows: 1fr 1fr 1fr;
    align-items: start;
  }

  ${breakpoints.desktopLarge} {
    padding: 3.2rem;
  }
`;

export const backButton = css`
  display: flex;
  align-items: center;
  justify-self: start;
  color: var(--font-03);
`;
