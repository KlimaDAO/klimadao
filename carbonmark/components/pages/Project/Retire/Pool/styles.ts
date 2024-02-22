import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

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

  &.error > button {
    border: 1px solid var(--warn);
  }
`;

export const paymentMethod = css`
  gap: 0.8rem;
  color: #000;
  display: flex;
  padding: 1rem;
  background: #fff;
  align-items: center;
  justify-content: space-between;
  border-radius: 0.8rem;
  border: 1px solid #8b8fae;

  &.selected {
    color: #fff;
    background: #58585c;
  }

  &:disabled {
    opacity: 0.5;
  }

  div {
    gap: 0.8rem;
    display: flex;
    align-items: center;
  }

  p {
    color: #626266;
    &.selected {
      color: #b0b1b8;
    }

    strong {
      font-weight: 700;
      padding-left: 0.8rem;
    }
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

export const textWithHelpIcon = css`
  display: flex;
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

export const divider = css`
  height: 0.1rem;
  background-color: var(--font-03);
`;

export const breakText = css`
  overflow-wrap: anywhere;
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

export const stickyContentWrapper = css`
  display: grid;
  gap: 2.4rem;
  position: initial;
  top: 1rem;

  ${breakpoints.large} {
    position: sticky;
  }
`;

export const buttonWrapper = css`
  margin: 0;

  button {
    width: 100%;
    display: flex;
    margin-top: 1rem;
  }
`;

export const bankTransferModal = css`
  .modalContent {
    width: 36.4rem;
  }
`;

export const confirmBankTransfer = css`
  margin-top: 2rem;
  display: grid;
  gap: 2rem;

  svg {
    width: 4rem;
    height: 4rem;
    color: var(--manatee);
  }
`;

export const confirmCreditCard = css`
  margin-top: 2rem;
  display: grid;
  gap: 2rem;
`;

export const viewButton = css`
  background-color: var(--bright-blue);
  color: white !important;
  width: 100%;
  margin-top: 1.6rem;
`;

export const fullWidthButton = css`
  width: 100%;
`;

export const feeText = css`
  p {
    color: var(--bright-blue);
  }
`;

export const iconFade = css`
  transition:
    opacity 800ms linear,
    display 800ms linear;
  opacity: 0;
`;

export const textTransition = css`
  animation: slide 0.4s forwards 0.6s;

  &.processing-fee {
    animation: change-color 1.8s forwards 0s;
  }

  &.carbonmark-fee {
    color: var(--bright-blue);
    animation: slide 0.4s forwards 0.6s;
  }

  &.total-cost {
    animation:
      slide-total-cost 0.4s forwards 0.6s,
      change-color 1.8s forwards 0s;
  }

  @keyframes slide {
    from {
      display: block;
    }
    to {
      transform: translateX(-2.8rem);
    }
  }

  @keyframes slide-total-cost {
    from {
      display: block;
    }
    to {
      transform: translateX(-4.4rem);
    }
  }

  @keyframes change-color {
    0% {
      color: var(--klima-green);
    }
    50% {
      color: var(--klima-green);
    }
    100% {
      color: #000;
    }
  }
`;
