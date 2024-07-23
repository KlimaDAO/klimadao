import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as typography from "@klimadao/lib/theme/typography";

export const container = css`
  display: grid;
  gap: 2rem;
  background-color: var(--surface-02);
  border: 2px solid var(--surface-03);
  padding: 2.4rem;
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
  background-color: var(--surface-01);
`;

export const switchButton = css`
  ${typography.button};
  display: flex;
  align-items: center;
  display: flex;
  justify-content: center;
  background-color: var(--surface-01);
  min-height: 4.8rem;

  &:hover {
    opacity: 0.8;
  }

  &[data-active="false"] {
    color: var(--font-01);
  }

  &[data-active="true"] {
    font-weight: bold;
    border-bottom: 3px solid var(--klima-green);
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

  & a {
    text-decoration: underline;
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
  border: none;
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
  padding: 0.4rem 0.8rem;

  .icon {
    min-width: 4.8rem;
    align-self: center;
  }

  p {
    padding: 0 0.6rem;
  }
`;
