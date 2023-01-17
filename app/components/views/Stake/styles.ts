import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as common from "@klimadao/lib/theme/common";
import * as typography from "@klimadao/lib/theme/typography";

export const stakeCard = css`
  position: relative;
  display: grid;
  background-color: var(--surface-02);
  border-radius: 1.2rem;
  padding: 2.4rem;
  gap: 2.4rem;
  align-content: start;
  grid-column: 1 / 3;

  .hr {
    height: 2px;
    background-color: var(--surface-01);
  }

  ${breakpoints.medium} {
    gap: 3.2rem;
  }

  ${breakpoints.desktop} {
    grid-column: cardsleft;
    grid-row: 2 / span 3;
    gap: 4.8rem;
    grid-template-rows: 1fr 1fr 1fr;
    align-items: start;
  }

  ${breakpoints.desktopLarge} {
    padding: 3.2rem;
  }
`;

export const stakeCard_header = css`
  display: grid;
  gap: 0.8rem;
  max-width: 38rem;
  .new-releases-icon {
    color: var(--klima-green);
    margin-inline-end: 0.4rem;
    margin-bottom: -0.4rem;
  }
`;

export const stakeCard_ui = css`
  display: grid;
  gap: 2.4rem;
  ${breakpoints.medium} {
    border: 2px solid var(--surface-03);
    padding: 2.4rem;
    border-radius: 1.2rem;
  }
  ${breakpoints.desktop} {
    gap: 4.8rem;
    padding: 3.2rem;
    max-width: 48rem;
    justify-self: center;
    width: 100%;
  }
`;

export const stakeCard_header_title = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const stakeIcon = css`
  margin-right: 10px;
`;

export const inputsContainer = css`
  display: grid;
  gap: 2rem;
`;

export const stakeSwitch = css`
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
  border-radius: 0.4rem;
  min-height: 4.8rem;
  &:hover {
    opacity: 0.8;
  }

  &[data-active="false"] {
    color: var(--font-01);
    background-color: var(--surface-01);
  }

  &[data-active="true"] {
    background-color: var(--klima-green);
    font-weight: bold;
    [data-theme="theme-dark"] & {
      color: black;
    }
  }
`;

export const stakeInput = css`
  min-height: 4.8rem;
  display: grid;
  grid-template-columns: 1fr min-content;
  z-index: 1; /* cover advanced-settings border */
`;

export const stakeInput_input = css`
  ${typography.body2};
  width: 100%;
  background-color: var(--surface-02);
  padding-left: 1.6rem;
  color: var(--font-02);
  border: 2px solid var(--surface-01);
  border-radius: 0.8rem 0 0 0.8rem;
  outline: none;
  font-family: monospace;
  &::placeholder {
    ${typography.caption};
    color: var(--font-02);
  }
  &:focus,
  &:hover:not(:disabled) {
    border-color: var(--klima-green);
  }
  &:disabled {
    opacity: 0.7;
  }
`;

export const stakeInput_max = css`
  ${common.iconButton};
  ${typography.button};
  padding: 0 1.6rem;
  border-radius: 0 0.8rem 0.8rem 0;
  &:hover:not(:disabled) {
    background-color: var(--surface-03);
  }
  &:disabled {
    opacity: 0.5;
    cursor: default;
  }
`;

export const infoTable = css`
  display: grid;
  grid-template-areas:
    "label label label"
    "data data data";
  row-gap: 0.4rem;
  column-gap: 1.6rem;
  justify-content: space-around;
  align-content: center;
  justify-items: center;
  text-align: center;
`;

export const address = css`
  font-family: monospace;
  text-align: center;
  color: var(--gray);
`;

export const infoTable_label = css`
  ${typography.caption};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  color: var(--font-03);
  display: flex;
  gap: 0.4rem;

  svg {
    color: var(--font-03);
    font-size: 2rem;
    width: 2rem;
    height: 2rem;
  }
`;

export const infoTable_value = css`
  ${typography.caption};
  color: var(--font-01);

  span[data-warning="true"] {
    color: rgb(248, 152, 27);
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
  text-transform: uppercase;
`;

export const columnRight = css`
  display: grid;
  gap: 2.4rem;
  grid-column: 1 / 3;
  align-content: start;

  ${breakpoints.desktop} {
    grid-column: 2 / 3;
  }
`;

export const connect_button = css`
  width: 100%;
`;
