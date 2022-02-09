import { css } from "@emotion/css";
import * as typography from "@klimadao/lib/theme/typography";
import * as common from "@klimadao/lib/theme/common";

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
  overflow-x: scroll;
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

  .comingSoonStack {
    display: grid;
    gap: 0.8rem;
  }
  .navFooter {
    margin-top: auto;
    display: grid;
    gap: 3.2rem;
  }
  .navFooter .hr {
    grid-row: 1 / 1;
    grid-column: 1 /4;
  }
  .navFooter_buttons {
    display: flex;
    gap: 1.6rem;
  }
  .navFooter_button {
    ${common.iconButton};
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
