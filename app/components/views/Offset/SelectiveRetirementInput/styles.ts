import { css } from "@emotion/css";

export const advancedButton = css`
  width: 100%;
  display: flex;
  align-items: center;
`;

// Boilerplate input styles that can be removed in the future
// when form is refactored
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

  input[data-error="true"] {
    border: 0.2rem solid red;
  }
`;
