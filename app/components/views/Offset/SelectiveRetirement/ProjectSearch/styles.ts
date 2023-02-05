import { css } from "@emotion/css";

export const noResultsContainer = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem;
  border: 0.175rem solid var(--surface-03);
  border-radius: 0.8rem;

  svg {
    min-height: 4rem;
    min-width: 4rem;
    fill: var(--klima-green);
  }

  & + button {
    background-color: var(--surface-01);
    &,
    &:hover:not(:disabled),
    &:visited {
      [data-theme="theme-dark"] & {
        color: #fff;
      }
    }
  }
`;
