import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const error404Card = css`
  position: relative;
  display: flex;
  justify-content: center;
  background-color: var(--surface-02);
  border-radius: 1.2rem;
  grid-column: 1 / 3;
  padding-top: 2.4rem;
  .hr {
    height: 2px;
    background-color: var(--surface-01);
  }

  ${breakpoints.desktop} {
    padding: 0;
    grid-column: cardsleft;
    grid-row: 2 / span 2;
  }

  ${breakpoints.desktopLarge} {
    padding: 3.2rem;
  }
`;
