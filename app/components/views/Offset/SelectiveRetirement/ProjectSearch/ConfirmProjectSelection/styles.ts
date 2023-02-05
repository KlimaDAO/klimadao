import { css } from "@emotion/css";

export const confirmSelection = css`
  height: 48rem;
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2rem;
  background-color: var(--surface-02);
  border: 0.2rem solid var(--surface-01);
  border-radius: 0.8rem;

  button {
    width: 100%;

    :last-of-type {
      background-color: var(--surface-01);
      &,
      &:hover:not(:disabled),
      &:visited {
        [data-theme="theme-dark"] & {
          color: #fff;
        }
      }
    }
  }
`;

export const icon = css`
  min-height: 4rem;
  min-width: 4rem;
  fill: var(--klima-green);
`;

export const buttons = css`
  width: 100%;
  margin-top: 3.2rem;
  gap: 1.2rem;
  display: flex;
  flex-direction: column;
`;
