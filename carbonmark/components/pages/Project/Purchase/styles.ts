import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const fullWidth = css`
  grid-column: full;
`;

export const projectHeaderTags = css`
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
  gap: 1.6rem;
  align-items: center;
`;

export const fullWidthBack = css`
  grid-column: full;
  align-items: center;
  margin-top: 0rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: min-content;
  width: min-content;
  a {
    white-space: nowrap;
  }
  ${breakpoints.desktop} {
    justify-content: center;
    height: 4.8rem;
    width: 21rem;
    border: 1px solid var(--font-01);
    border-radius: 0.4rem;
  }
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
  align-items: flex-start;
  flex-direction: column;
  gap: 2.5rem;

  .stack {
    display: grid;
    justify-items: start;
    gap: 0.8rem;
  }

  ${breakpoints.medium} {
    padding: 10rem 2rem;
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
  font-weight: 600;
  z-index: 1;

  a {
    color: var(--klima-blue);
  }
`;

export const price = css`
  align-self: start;
  padding: 0.8rem 1.6rem;
  background-color: var(--yellow);
  align-items: center;
  border-radius: var(--border-radius);
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

export const errorMessagePrice = css`
  font-size: 1.2rem;
  line-height: 1.4rem;
  font-weight: 400;
  color: var(--warn);
  margin-bottom: 0.2rem;
  word-break: break-word;
  margin-top: -0.8rem;

  ${breakpoints.large} {
    font-size: 1.4rem;
    line-height: 1.6rem;
    margin-bottom: 0.8rem;
  }
`;
