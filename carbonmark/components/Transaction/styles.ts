import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as typography from "theme/typography";

export const container = css`
  display: grid;
  gap: 2rem;
  padding-top: 2.4rem;
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
  border-radius: 0.8rem;
  padding: 0.4rem;
  background-color: var(--surface-02);
`;

export const switchButton = css`
  ${typography.button};
  display: flex;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: var(--surface-02);
  min-height: 4.8rem;

  &:hover {
    opacity: 0.8;
  }

  &[data-active="false"] {
    color: var(--font-01);
  }

  &[data-active="true"] {
    font-weight: bold;
    border-bottom: 3px solid var(--bright-blue);
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
    color: var(--bright-blue);
  }
`;

export const buttonRow = css`
  display: flex;
  justify-content: center;
`;

export const buttonRow_spinner = css`
  padding: 0 0.8rem;
  display: flex;
  align-items: center;
  min-height: 4.8rem;
`;

export const submitButton = css`
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

export const value = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--surface-01);
  color: var(--font-01);
  height: 5.6rem;
  border-radius: 1rem;
  border: 1px solid var(--font-01);
  padding: 0.4rem 0.8rem;

  .icon {
    min-width: 4.8rem;
    align-self: center;
  }

  p {
    padding: 0 0.6rem;
  }
`;
