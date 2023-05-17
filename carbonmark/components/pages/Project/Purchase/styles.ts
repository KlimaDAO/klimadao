import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  grid-column: main;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 2.4rem;
`;

export const loginButton = css`
  display: none;
  ${breakpoints.desktop} {
    display: flex;
    flex-direction: row-reverse;
  }
`;

export const projectHeaderTags = css`
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
  gap: 1.6rem;
  align-items: center;
`;

export const backToProjectButton = css`
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
  border-radius: var(--border-radius);
`;

export const inactivePurchase = css`
  display: flex;
  gap: 2rem;
  flex-direction: column;
  align-items: center;
  align-self: center;
`;

export const formContainer = css`
  max-width: 42rem;
  align-self: center;
  display: flex;
  flex-direction: column;
`;

export const inputsContainer = css`
  display: grid;
  align-content: start;
  gap: 1.6rem;
  overflow: hidden;
  margin-bottom: 2rem;
`;

export const amountLabel = css`
  display: grid;
  gap: 0.4rem;
`;

export const paymentLabel = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const paymentDropdown = css`
  button {
    width: 100%;
    gap: 1rem;
  }
`;

export const paymentDropDownHeader = css`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const paymentHelp = css`
  display: flex;
  gap: 0.8rem;
`;

export const paymentText = css`
  display: grid;
  gap: 0.4rem;
`;

export const helpIcon = css`
  width: 2rem;
  height: 2rem;
  color: var(--font-02);
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

export const formatParagraph = css`
  p {
    margin-bottom: 1em;
  }
`;

export const totalsText = css`
  display: grid;
  gap: 0.8rem;
`;

export const divider = css`
  height: 0.1rem;
  background-color: var(--font-03);
`;

export const iconAndText = css`
  display: flex;
  gap: 0.8rem;
`;

export const error = css`
  color: var(--warn);
`;

export const showOnDesktop = css`
  display: none;
  ${breakpoints.large} {
    display: flex;
  }
`;

export const hideOnDesktop = css`
  ${breakpoints.large} {
    display: none;
  }
`;

export const submitSpinner = css`
  color: var(--white);
`;
