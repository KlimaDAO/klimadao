import { css } from "@emotion/css";

export const formContainer = css`
  margin-top: 2rem;
  overflow: hidden;
  display: grid;
  align-content: start;
  gap: 1.6rem;
  overflow: hidden;

  .error {
    color: var(--warn);
  }
`;

export const inputsContainer = css`
  display: grid;
  align-content: start;
  gap: 1.6rem;
  overflow: hidden;
`;

export const availableAmount = css`
  margin-top: -1rem;
  margin-left: 1rem;
  margin-bottom: 1rem;
`;

export const spinner = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const editLabelProjectName = css`
  background: var(--surface-04);
  border-radius: 1rem;
  padding: 1.4rem 1rem;
  min-height: 4.8rem;
`;

export const profileLogo = css`
  justify-self: center;
`;
