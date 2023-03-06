import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const fullWidth = css`
  grid-column: full;
`;

export const receiptContainer = css`
  margin: 0 auto;
  max-width: 75rem;
`;

export const backToResults = css`
  color: var(--font-01) !important;

  svg {
    margin-right: 0.8rem;
  }
`;

export const receiptContent = css`
  padding: 2rem;

  ${breakpoints.large} {
    padding: 6rem 15rem;
  }
  display: grid;
  gap: 2rem;

  .headline {
    color: var(--font-03);
    display: flex;
    align-items: center;
    gap: 0.8rem;
  }

  .summary {
    background-color: var(--surface-03);
    padding: 1.4rem;

    display: grid;

    gap: 1.4rem;
  }

  .cols {
    display: flex;
    justify-content: space-between;
    padding-bottom: 2rem;
    border-bottom: 2px solid var(--gray);
  }

  .col {
    display: grid;
    gap: 0.8rem;
  }

  .country {
    color: var(--klima-green);
  }
`;

export const imageGradient = css`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const projectHeaderText = css`
  color: var(--white);
  word-break: break-word;
  font-size: 1.4rem;
  font-weight: 600;
  z-index: 1;

  a {
    color: var(--klima-blue);
  }
`;

export const price = css`
  display: flex;
  gap: 0.4rem;
  flex-direction: column;
  border-radius: var(--border-radius);
  padding: 0.4rem 0.8rem;
  background-color: var(--surface-02);
  flex-direction: row;
  align-items: center;
  align-self: flex-start;

  font-size: 1.4rem;
  color: var(--font-01);
`;

export const formContainer = css`
  max-width: 42rem;
`;

export const inputsContainer = css`
  display: grid;
  align-content: start;
  gap: 1.6rem;
  overflow: hidden;
`;

export const availableAmount = css`
  margin-top: -1rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

export const spinnerWrap = css`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 25rem;
`;
