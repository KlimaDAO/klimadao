import { css } from "@emotion/css";

export const container = css`
  display: grid;
  align-content: start;
  gap: 2rem;
  margin-top: 2rem;
`;

export const input = css`
  display: grid;
  align-content: start;
  gap: 0.75rem;
`;

export const errorMessage = css`
  color: var(--warn);
  text-align: center;
`;
