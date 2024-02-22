import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  grid-column: full;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 2.4rem;
  ${breakpoints.large} {
    grid-column: main;
  }
`;

export const loginButton = css`
  display: none;
  ${breakpoints.desktop} {
    display: flex;
    flex-direction: row-reverse;
  }
`;

export const backToProject = css`
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  align-items: center;
  height: min-content;
  width: min-content;
  color: var(--font-01) !important;
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

  &.error > button {
    border: 1px solid var(--warn);
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
  /** && adds specificity to override the mui root styles */
  && {
    width: 2rem;
    height: 2rem;
    color: var(--font-03);
  }
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

  &.balance {
    margin-top: 0.4rem;
  }

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

export const title = css`
  font-size: 2rem;
  font-weight: 700;
  line-height: 2.8rem;
  color: var(--font-02);
`;

export const totalsText = css`
  display: grid;
  gap: 0.8rem;
`;

export const textWithHelpIcon = css`
  display: flex;
  gap: 0.4rem;
`;

export const divider = css`
  height: 0.1rem;
  background-color: var(--font-03);
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

export const labelWithInput = css`
  display: grid;
  gap: 0.8rem;
`;

export const breakText = css`
  overflow-wrap: anywhere;
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

export const stickyContentWrapper = css`
  display: grid;
  gap: 2.4rem;
  position: initial;
  top: 1rem;

  ${breakpoints.large} {
    position: sticky;
  }
`;
