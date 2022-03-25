import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as typography from "@klimadao/lib/theme/typography";
import * as common from "@klimadao/lib/theme/common";

export const offsetCard = css`
  display: grid;
  align-content: start;
  background-color: var(--surface-02);
  border-radius: 1.2rem;
  padding: 2.4rem;
  gap: 2.4rem;
  align-content: start;

  ${breakpoints.medium} {
    gap: 3.2rem;
  }

  ${breakpoints.desktop} {
    grid-column: cardsleft;
    grid-row: 2 / span 3;
    gap: 4.8rem;
    grid-template-rows: 1fr 1fr 1fr;
    align-items: start;
    min-height: 128rem;
  }

  ${breakpoints.desktopLarge} {
    min-height: 118rem;
    padding: 3.2rem;
  }
`;

export const offsetCard_header = css`
  display: grid;
  gap: 0.8rem;
  max-width: 38rem;
`;

export const offsetCard_ui = css`
  display: grid;
  gap: 2.4rem;
  overflow: none;

  ${breakpoints.medium} {
    border: 2px solid var(--surface-03);
    padding: 2.4rem;
    border-radius: 1.2rem;
  }

  ${breakpoints.desktop} {
    gap: 2.4rem;
    padding: 2.4rem;
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
  gap: 1rem;

  textarea {
    width: 100%;
    background-color: var(--surface-02);
    border-radius: 1rem;
    border: 0.2rem solid var(--surface-03);
    padding-inline-start: 1rem;
    min-height: 2.4rem;
    color: var(--font-01);
    resize: none;
    padding-top: 1rem;
    overflow-y: hidden;
    min-height: 16rem;
  }

  input {
    width: 100%;
    background-color: var(--surface-02);
    border-radius: 1rem;
    border: 0.2rem solid var(--surface-03);
    padding-inline-start: 1rem;
    min-height: 4.8rem;
    color: var(--font-01);
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
`;

export const retirementSuccessModal = css`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  cursor: not-allowed;
  z-index: 99;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.6rem;
  .card {
    position: relative;
    cursor: default;
    align-self: center;
    max-width: 62rem;
    min-height: 24rem;
    background-color: var(--surface-02);
    border-radius: 0.8rem;
    padding: 1.6rem;
    ${breakpoints.desktop} {
      padding: 2.4rem;
    }
    display: grid;
    gap: 3.2rem;
    .address {
      word-break: break-all;
    }
    .close-icon {
      position: absolute;
      top: 0;
      right: 0;
      padding: 0.8rem;
    }
    .content {
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
    }
  }
`;
