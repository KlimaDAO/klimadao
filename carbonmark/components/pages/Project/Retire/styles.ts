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

export const price = css`
  height: 3.6rem;
  align-self: start;
  padding: 0.8rem 1.6rem;
  background-color: var(--yellow);
  border-radius: var(--border-radius);

  & p {
    font-size: 1.6rem;
    line-height: 2rem;
  }

  ${breakpoints.medium} {
    height: 4.4rem;
    & p {
      font-size: 2rem;
      line-height: 2.8rem;
    }
  }
`;

export const formContainer = css`
  max-width: 42rem;
  align-self: center;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const inputsContainer = css`
  display: grid;
  align-content: start;
  gap: 2rem;
  overflow: hidden;
  margin-bottom: 2rem;
`;

export const quantityLabel = css`
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

export const labelWithInput = css`
  display: grid;
  gap: 0.8rem;
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

export const withToggle = css`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
`;

export const externalLink = css`
  color: var(--font-01);
  text-decoration: underline;
  display: flex;
  gap: 0.4rem;
  align-items: center;

  &:hover,
  &:visited {
    color: var(--font-02);
    text-decoration: none;
  }
`;

export const toggleFees = css`
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const fees = css`
  background-color: var(--surface-02);
  padding: 0.4rem;
  display: grid;
  gap: 0.8rem;
  border-top: 2px solid var(--manatee);
  border-bottom: 2px solid var(--manatee);
`;

export const feeBreakdown = css`
  background-color: var(--surface-02);
  display: grid;
  padding: 0.4rem;
`;

export const feeText = css`
  display: flex;
  justify-content: space-between;
  gap: 0.8rem;
`;

export const feeColor = css`
  color: var(--bright-blue);
`;

export const breakText = css`
  overflow-wrap: anywhere;
`;

export const divider = css`
  height: 0.1rem;
  background-color: var(--manatee);
`;

export const iconAndText = css`
  display: flex;
  gap: 0.8rem;

  .icon {
    flex-shrink: 0;
  }

  .error {
    color: var(--warn);
  }
`;

export const error = css`
  color: var(--warn);
`;

export const showOnDesktop = css`
  display: none;
  ${breakpoints.large} {
    display: flex;
    margin-bottom: 2.4rem;
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

export const reverseOrder = css`
  ${breakpoints.large} {
    order: -1;
  }
`;

export const successScreen = css`
  margin-top: 3.2rem;
  display: grid;
  gap: 2rem;

  .headline {
    display: flex;
    gap: 1.2rem;
  }

  .summary {
    display: grid;
    gap: 1.2rem;
  }
`;

export const required = css`
  color: var(--warn);
`;

export const disclaimer = css`
  color: var(--font-01);
  display: flex;
  gap: 1.2rem;
  padding: 1.6rem;
  border-radius: 0.8rem;
  border: 0.2rem solid var(--yellow);

  svg {
    color: var(--yellow);
    width: 3.2rem;
    height: 3.2rem;
  }
`;
