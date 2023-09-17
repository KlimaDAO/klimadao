import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const dropdownHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  background-color: var(--surface-02);
  border-radius: 1rem;
  padding: 1rem 0.8rem 1rem 1.4rem;
  min-height: 4.8rem;

  &:hover {
    cursor: pointer;
  }

  svg {
    fill: var(--font-03);
  }

  &.disableToggle {
    &:hover {
      cursor: default;
    }
  }
`;

export const tippyContainer = css`
  .tippy-box {
    background-color: var(--surface-01);
    border-radius: 1rem;
    box-shadow: var(--shadow-03);
    margin-top: 0rem;
    font-size: 1.6rem;
  }
`;

export const dropdownButton = css`
  display: flex;
  align-items: center;
  background-color: var(--surface-02);
  border-radius: 1rem;
  padding: 1.2rem;
  min-height: auto;
  justify-content: start;

  &:hover {
    cursor: pointer;
    color: var(--blue-yellow);
  }

  &[data-active="true"] {
    color: var(--blue-yellow);
  }

  ${breakpoints.large} {
    padding: 1rem;
    min-height: 4.8rem;
  }

  &:disabled {
    opacity: 50%;
    cursor: default;
  }
  &:disabled:hover {
    color: var(--font-01);
  }

  span {
    background: var(--white);
    padding: 0.4rem;
    margin-left: 2rem;
  }
`;
