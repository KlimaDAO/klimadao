import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const footerBuyKlima = css`
  position: relative;
  overflow: hidden;

  grid-column: main;
  padding: 8rem 2.4rem 6rem;
  border-radius: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2.5rem;

  ${breakpoints.medium} {
    padding: 8rem 5.2rem 6rem;
    justify-content: start;
    align-items: start;
  }
`;

export const buyKlimaImageGradient = css`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const footerBuyKlimaText = css`
  z-index: 2;
  color: var(--white);
  ${breakpoints.large} {
    max-width: 70%;
  }
`;

export const footerButtons = css`
  z-index: 2;
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2.5rem;
  ${breakpoints.medium} {
    flex-direction: row;
    justify-content: start;
    align-items: start;
  }
`;
