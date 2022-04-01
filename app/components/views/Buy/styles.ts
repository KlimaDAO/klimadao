import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const buyCard = css`
  position: relative;
  display: grid;
  align-content: start;
  grid-column: 1 / 3;
  grid-template-rows: min-content 1fr;
  background-color: var(--surface-02);
  border-radius: 1.2rem;
  padding-top: 2.4rem;
  gap: 2.4rem;

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

export const buyCard_iframeContainer = css`
  display: flex;
  flex-direction: column;
`;

export const buyCard_iframe = css`
  border-radius: 1.2rem;
  border: none;
  width: 100%;
  height: 82rem;
  margin-top: 1.5rem;
`;

export const buyCard_header = css`
  display: grid;
  gap: 0.8rem;
  max-width: 38rem;
  padding-left: 2.4rem;
  padding-right: 2.4rem;

  ${breakpoints.desktopLarge} {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const buyCard_header_title = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const buyCard_ui = css`
  display: grid;
  gap: 2.4rem;
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

export const address = css`
  font-family: monospace;
  text-align: center;
  color: var(--gray);
`;
