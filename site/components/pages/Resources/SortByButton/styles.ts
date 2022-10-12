import { css } from "@emotion/css";

export const sortbyButton = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  background-color: var(--surface-01);
  border-radius: 1rem;
  padding: 1rem;
  min-height: 4.8rem;
  justify-content: center;

  &:hover {
    cursor: pointer;
    color: var(--klima-green);
  }

  &[data-active="true"] {
    color: var(--klima-green);
  }
`;
