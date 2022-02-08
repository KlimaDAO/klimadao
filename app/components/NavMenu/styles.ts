import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as typography from "@klimadao/lib/theme/typography";

export const container = css`
  position: relative;
  padding: 3.2rem;
  background-color: var(--surface-02);
  display: flex;
  flex-direction: column;
  height: 100%;
  max-width: 24.4rem;
  z-index: 3;
  gap: 2.4rem;

  .stack-04 {
    display: grid;
    gap: 0.4rem;
  }

  .stack-12 {
    display: grid;
    gap: 1.2rem;
  }

  .hr {
    height: 0.2rem;
    width: 100%;
    background-color: var(--surface-01);
  }

  ${breakpoints.medium} {
    max-width: unset;
    .closeButton {
      display: none;
    }
  }
`;

export const sidebarButton = css`
  ${typography.caption};
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.4rem;
  border-radius: 0.8rem;
  width: 100%;

  span {
    color: var(--font-03);
  }

  .iconContainer {
    color: var(--font-02);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.8rem;
    width: 3.8rem;
    background-color: var(--surface-01);
    border-radius: 0.6rem;
  }

  &[data-active="true"] {
    background-color: var(--surface-01);
    border: 1px solid var(--surface-03);
  }
  &[data-active="true"] span {
    color: var(--font-01);
  }

  &[data-active="true"] .iconContainer {
    background-color: var(--klima-green);
  }

  &[data-disabled="true"] {
    opacity: 0.5;
  }

  ${breakpoints.small} {
    span {
      display: none;
    }
  }

  ${breakpoints.medium} {
    span {
      display: initial;
    }
  }
`;
