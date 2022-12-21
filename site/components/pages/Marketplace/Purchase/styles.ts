import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const fullWidth = css`
  grid-column: 1 / 3;
`;

export const projectLink = css`
  display: inline-flex;
  margin: 1rem 0;
`;

export const backToResults = css`
  color: var(--font-01) !important;

  svg {
    margin-right: 0.8rem;
  }
`;

export const projectHeader = css`
  position: relative;
  overflow: hidden;
  padding: 2.4rem 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2.5rem;

  .stack {
    display: grid;
    gap: 1.6rem;
  }

  ${breakpoints.medium} {
    padding: 10rem 0;
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
  margin-top: 2rem;
  overflow: hidden;
  display: grid;
  align-content: start;
  gap: 1.6rem;
  overflow: hidden;

  .error {
    color: var(--warn);
  }
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
