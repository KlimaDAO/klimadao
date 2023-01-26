import { css } from "@emotion/css";

export const selectProjectContainer = css`
  position: relative;
  display: inherit;
  flex-direction: inherit;
  gap: inherit;
`;

export const projectList = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-height: 36rem;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;

export const projectActionButtons = css`
  display: flex;
  gap: 0.8rem;
  justify-content: space-around;
  width: inherit;

  button {
    width: 100%;

    :first-of-type {
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
