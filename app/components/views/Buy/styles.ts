import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const buyCard = css`
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

export const buyCard_header = css`
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

export const buyCard_header_title = css`
  display: flex;
  width: 100%;
  text-align: left;
  align-items: center;
  gap: 0.8rem;
`;

export const buyCard_header_subtitle = css`
  width: 100%;
  text-align: left;
  padding-top: 0.8rem;
`;

export const buyCard_ui = css`
  display: grid;
  gap: 2.4rem;
  padding-left: 2.4rem;
  padding-right: 2.4rem;
  padding-bottom: 2.4rem;
  ${breakpoints.medium} {
    border: 2px solid var(--surface-03);
    padding: 2.4rem;
    border-radius: 1.2rem;
  }
  ${breakpoints.desktop} {
    gap: 4.8rem;
    padding: 3.2rem;
    max-width: 48rem;
    justify-self: center;
    width: 100%;
  }
`;

export const submitButton = css`
  width: 100%;
`;

export const copyButton = css`
  margin: 0rem 2.4rem;
  justify-self: start;
  gap: 0.4rem;
  ${breakpoints.desktopLarge} {
    margin: unset;
  }
`;

export const address = css`
  font-family: monospace;
  text-align: center;
  color: var(--gray);
`;

export const connect_button = css`
  width: 100%;
`;
