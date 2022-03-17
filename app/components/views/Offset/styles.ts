import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as typography from "@klimadao/lib/theme/typography";
import * as common from "@klimadao/lib/theme/common";

export const offsetCard = css`
  position: relative;
  display: grid;
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
    min-height: 78rem;
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

export const offsetCard_ui = css`
  display: grid;
  gap: 2.4rem;
  ${breakpoints.medium} {
    padding: 2.4rem;
    border-radius: 1.2rem;
  }
  ${breakpoints.desktop} {
    gap: 2.4rem;
    padding: 2.4rem;
    justify-self: center;
    width: 100%;
  }
  .mini_token_display_row {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .mini_token_display_icon {
    display: flex;
    width: 4.8rem;
    height: 4.8rem;
    margin-top: 2.4rem;
    color: var(--font-01);
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
  input {
    width: 100%;
    background-color: var(--surface-02);
    border-radius: 1rem;
    border: 0.2rem solid var(--surface-03);
    padding-inline-start: 2rem;
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
