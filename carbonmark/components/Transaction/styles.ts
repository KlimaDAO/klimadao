import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as typography from "@klimadao/lib/theme/typography";

export const container = css`
  display: grid;
  gap: 2rem;
  background-color: white;
  border-radius: 1.2rem;
`;

export const contentContainer = css`
  display: grid;
  gap: 2rem;

  &.success {
    opacity: 0.3;
  }
`;

export const viewSwitch = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-content: stretch;
  align-items: center;
  padding: 0.4rem;
`;

export const switchButton = css`
  ${typography.button};
  display: flex;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: var(--bright-blue);
  min-height: 4.8rem;
  color: white;
  border-radius: 4px;

  &:hover {
    opacity: 0.8;
  }

  &[data-active="false"] {
    color: var(--font-01);
    background-color: var(--surface-02);
  }

  &[data-active="true"] {
    font-weight: bold;
  }

  &:disabled {
    opacity: 50%;
  }
`;

export const statusMessage = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  & svg {
    color: var(--klima-green);
  }
`;

export const buttonRow = css`
  display: flex;
  justify-content: center;
`;
export const buttonColumn = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  justify-content: center;
`;

export const buttonRow_spinner = css`
  padding: 0 0.8rem;
  display: flex;
  align-items: center;
  min-height: 4.8rem;
`;

export const submitButton = css`
  background-color: var(--bright-blue);
  color: white !important;
  width: 100%;
`;

export const backButton = css`
  font-family: "Poppins";
  background-color: white;
  color: black;
  border: 1px solid var(--font-01);
  width: 100%;
`;

export const spinner_container = css`
  padding: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 4.8rem;
`;

export const valueContainer = css`
  display: grid;
  flex-direction: column;
  width: 100%;
  gap: 0.6rem;

  .label {
    height: 2rem;

    ${breakpoints.medium} {
      justify-self: flex-start;
    }
  }

  .value.warn {
    color: var(--warn);
  }
`;

export const processingRetirement = css`
  margin: 0 auto;
  padding-bottom: 1.6rem;

  p {
    ${breakpoints.small} {
      font-size: 2rem;

  }

  @media (max-width: 376px) {
    font-size: 16px;
  }

`;

export const value = css`
  display: flex;

  align-items: center;
  background-color: var(--surface-02);
  color: var(--font-01);
  height: 5.6rem;
  border-radius: 1rem;
  padding: 0.4rem 0.8rem;

  .icon {
    margin-right: 0.8rem;
    align-self: center;
  }

  p {
    padding: 0 0.6rem;
  }
`;
