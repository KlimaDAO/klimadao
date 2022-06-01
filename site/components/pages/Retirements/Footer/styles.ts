import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const section = css`
  padding-top: 1rem;
  padding-bottom: 4rem;

  ${breakpoints.medium} {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

export const retirementFooter = css`
  grid-column: main;
  display: grid;
  gap: 2.8rem;
  padding: 1.5rem;

  ${breakpoints.medium} {
    padding: 5.2rem;
  }
`;

export const footerContent = css`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  ${breakpoints.medium} {
    display: flex;
    justify-content: space-between;
    gap: 3rem;
    flex-direction: row;
  }

  .column {
    flex: 1;
    display: flex;
    gap: 4rem;
    flex-direction: column;
  }
`;

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
