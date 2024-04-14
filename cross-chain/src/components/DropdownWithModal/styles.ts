import { css } from "@emotion/css";

export const container = css`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

export const warn = css`
  border: 0.175rem solid var(--warn);
`;

export const listItem = css`
  border: 0.2rem solid var(--surface-03);
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 1rem;
  padding: 0.4rem 0.8rem;
  &:hover {
    background-color: var(--surface-03);
  }
  .start_content,
  .end_content {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

export const select_button = css`
  ${listItem}
  &[data-active="true"] {
    background-color: var(--surface-03);
  }
  &:disabled {
    opacity: 50%;
  }
  &:disabled:hover {
    background-color: inherit;
  }
`;
