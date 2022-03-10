import { css } from "@emotion/css";

export const container = css`
  display: grid;
  flex-direction: column;
  gap: 0.5rem;
  label {
    text-transform: uppercase;
  }
`;

export const card = css`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: var(--surface-01);
  color: var(--font-01);
  min-height: 4.8rem;
  border-radius: 1rem;
  padding: 0.5rem 0.8rem;
`;
