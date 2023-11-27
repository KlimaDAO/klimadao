import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const ctaCard = css`
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

export const ctaCard_header = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  padding: 0 2.4rem 2.4rem 2.4rem;
  max-width: 50rem;
  width: 100%;
  gap: 3.2rem;
  ${breakpoints.desktop} {
    padding-top: 3.2rem;
  }
`;

export const ctaCard_header_title = css`
  display: flex;
  width: 100%;
  text-align: left;
  align-items: center;
  gap: 0.8rem;
`;

export const ctaCard_header_subtitle = css`
  width: 100%;
  text-align: left;
  padding-top: 0.8rem;
`;

export const columnRight = css`
  display: grid;
  gap: 2.4rem;
  grid-column: 1 / 3;
  align-content: start;

  ${breakpoints.desktop} {
    grid-column: 2 / 3;
  }
`;
