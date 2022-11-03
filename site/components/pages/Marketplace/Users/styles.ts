import { css } from "@emotion/css";

export const fullWidth = css`
  grid-column: 1 / 3;
`;

export const projectLink = css`
  display: inline-flex;
  margin: 1rem 0;
`;

export const editForm = css`
  display: grid;
  align-content: start;
  gap: 1.6rem;
  margin-top: 2rem;
  overflow: hidden;

  .error {
    color: var(--warn);
  }
`;
