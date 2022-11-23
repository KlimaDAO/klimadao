import { css } from "@emotion/css";

export const card = css`
  background-color: var(--surface-01);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-01);
  padding: 1.6rem;
  display: flex;
  gap: 1.6rem;
  flex-direction: column;
`;

export const activity = css`
  border-left: 2px solid var(--surface-04);
  padding: 1.2rem;
  display: grid;
  gap: 0.8rem;

  .number {
    padding: 0.4rem 0.8rem;
    background-color: var(--surface-02);
  }

  .seller {
    color: var(--klima-blue);
    margin-right: 0.4rem;
  }
`;
