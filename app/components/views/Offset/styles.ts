import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as typography from "@klimadao/lib/theme/typography";
import * as common from "@klimadao/lib/theme/common";

export const columnRight = css`
  display: grid;
  gap: 2.4rem;
  grid-column: 1 / 3;
  align-content: start;

  ${breakpoints.desktop} {
    grid-column: 2 / 3;
  }
`;

export const beneficiary = css`
  display: grid;
  gap: 0.8rem;
  align-content: start;

  .defaultAddress {
    font-size: 1.3rem;
    margin-top: -0.2rem;
  }
`;

export const offsetCard = css`
  display: grid;
  background-color: var(--surface-02);
  align-content: start;
  border-radius: 1.2rem;
  padding: 2.4rem;
  gap: 2.4rem;
  grid-column: 1 / 3;

  ${breakpoints.desktop} {
    grid-column: cardsleft;
    grid-row: 2 / auto;
    gap: 4.8rem;
    align-items: start;
  }

  ${breakpoints.desktopLarge} {
    padding: 3.2rem;
  }
`;

export const offsetCard_header = css`
  display: grid;
  gap: 0.8rem;
  max-width: 38rem;
`;
export const newReleasesIcon = css`
  color: var(--klima-green);
  margin-inline-end: 0.4rem;
  margin-bottom: -0.4rem;
`;

export const offsetCard_ui = css`
  display: grid;
  gap: 2.5rem;

  ${breakpoints.medium} {
    border: 2px solid var(--surface-03);
    padding: 2.4rem;
    border-radius: 1.2rem;
  }

  ${breakpoints.desktop} {
    justify-self: center;
    max-width: 48rem;
    width: 100%;
  }

  .mini_token_label {
    color: var(--font-01);
    display: flex;
    align-items: center;
    gap: 0.4rem;
  }

  .disclaimer {
    color: var(--font-01);
    display: flex;
    gap: 1.2rem;
  }

  .disclaimer svg {
    color: yellow;
    width: 3.2rem;
    height: 3.2rem;
  }
`;

export const offsetCard_header_title = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
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

export const input = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

  textarea {
    width: 100%;
    background-color: var(--surface-02);
    border-radius: 0.8rem;
    border: 0.2rem solid var(--surface-03);
    padding-inline-start: 0.8rem;
    min-height: 2.4rem;
    color: var(--font-01);
    resize: none;
    padding-top: 0.8rem;
    overflow-y: hidden;
    min-height: 16rem;
  }

  input {
    width: 100%;
    background-color: var(--surface-02);
    border-radius: 0.8rem;
    border: 0.2rem solid var(--surface-03);
    padding-inline-start: 0.8rem;
    min-height: 4.8rem;
    color: var(--font-01);
  }

  label {
    display: flex;
    gap: 0.8rem;
    color: white;
    align-items: center;
  }

  .number_input_container {
    min-height: 4.8rem;
    display: grid;
    grid-template-columns: 1fr min-content;
    z-index: 1; /* cover advanced-settings border */
  }

  .button_max {
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
  }
  input[data-error="true"] {
    border: 0.2rem solid red;
  }
`;

export const modalContent = css`
  display: grid;
  gap: 1.6rem;
  .success {
    display: flex;
    gap: 0.8rem;
    justify-content: center;
    align-items: center;
    svg {
      color: var(--klima-green);
    }
  }
`;

export const advancedButton = css`
  width: 100%;
  display: flex;
  align-items: center;

  &,
  & .advancedButton_label {
    color: var(--font-03);
  }
`;

export const advancedButtonInput = css`
  width: 100%;
  display: flex;
  align-items: center;
  gap: 0.8rem;

  input[data-error="true"] {
    border: 0.2rem solid red;
  }

  .advancedButtonInput_iconAligner {
    display: flex;
    width: 100%;
    position: relative;
    align-items: center;
  }
  .deletebutton {
    position: absolute;
    right: 0.2rem;
    background-color: var(--surface-02);
  }
  .plusbutton,
  .deletebutton {
    color: var(--font-03);
    width: 3.4rem;
    height: 3.4rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .plusbutton:hover,
  .deletebutton:hover {
    color: var(--font-01);
  }
  .plusbutton.hidden {
    visibility: hidden;
  }
`;
