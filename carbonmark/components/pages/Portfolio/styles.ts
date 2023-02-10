import { css } from "@emotion/css";

export const fullWidth = css`
  display: flex;
  gap: 2rem;
`;

export const isLoading = css`
  color: var(--klima-green);
`;

export const errorMessage = css`
  color: var(--warn);
  margin-bottom: 0.2rem;
  word-break: break-word;
`;
