import { css } from "@emotion/css";

export const fullWidth = css`
  grid-column: 1 / 3;
`;

export const card = css`
  background-color: var(--surface-01);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-01);
  padding: 1.6rem;
`;

export const projectLink = css`
  display: inline-flex;
  margin: 1rem 0;
`;

export const formContainer = css`
  margin-top: 2rem;
  overflow: hidden;
  display: grid;
  align-content: start;
  gap: 1.6rem;
  overflow: hidden;

  .error {
    color: var(--warn);
  }
`;

export const inputsContainer = css`
  display: grid;
  align-content: start;
  gap: 1.6rem;
  overflow: hidden;
`;
