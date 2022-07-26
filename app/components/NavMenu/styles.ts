import { css } from "@emotion/css";
import * as typography from "@klimadao/lib/theme/typography";
import * as common from "@klimadao/lib/theme/common";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  position: relative;
  padding: 3.2rem;
  background-color: var(--surface-02);
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  z-index: 3;
  gap: 2.4rem;
  max-height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;

  #klima-logo {
    height: 2.8rem;
    width: auto;
  }

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

  .labelStack {
    display: grid;
    gap: 0.8rem;
  }

  .navFooter {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 3.2rem;
  }

  .navFooter .hr {
    grid-row: 1 / 1;
    grid-column: 1 / 4;
  }

  .domain-wrapper {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    overflow: hidden;
    padding-top: 0.5rem;
    gap: 1rem;
  }

  .avatar {
    height: 4rem;
    width: 4rem;
    min-width: 4rem;
    border-radius: 2rem;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      height: 4rem;
      width: 4rem;
    }
    overflow: hidden;
  }

  .domain-name {
    text-overflow: ellipsis;
    max-width: 100%;
    overflow: hidden;
  }

  .navFooter_buttons {
    display: grid;
    width: 100%;
    grid-template-columns: repeat(4, 4.2rem);
    justify-content: center;
    gap: 1rem;

    ${breakpoints.desktop} {
      gap: 1rem;
      grid-template-columns: repeat(4, 4.6rem);
    }
  }

  .navFooter_button {
    ${common.iconButton};
    min-height: 4.2rem;
    min-width: 4.2rem;

    ${breakpoints.desktop} {
      min-height: 4.6rem;
      min-width: 4.6rem;
    }
  }
`;

export const sidebarButton = css`
  ${typography.caption};
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.1rem;
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

  &:hover,
  &:focus {
    background-color: var(--surface-01);
  }

  &:hover span,
  &:focus span {
    color: var(--font-02);
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
`;
