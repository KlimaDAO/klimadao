import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const columnRight = css`
  display: grid;
  gap: 2.4rem;
  grid-column: 1 / 3;
  align-content: start;

  ${breakpoints.desktop} {
    grid-column: 2 / 3;
  }
`;

export const offsetCard = css`
  display: grid;
  background-color: var(--surface-02);
  align-content: start;
  border-radius: 1.2rem;
  padding: 1.6rem;
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

export const offsetCard_ui = css`
  display: grid;
  gap: 2.4rem;

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

    input[data-error="true"] {
      border: 0.175rem solid var(--warn);
    }
  }

  input[data-error="true"] {
    border: 0.175rem solid var(--warn);
  }

  .invalid_project_tonnage {
    font-size: 1.4rem;
    color: var(--warn);
  }
`;

export const pay_with_dropdown = css`
  gap: 0.6rem;
  display: flex;
  flex-direction: column;

  .warn {
    color: var(--warn);
  }
`;
