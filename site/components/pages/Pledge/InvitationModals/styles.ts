import { css } from "@emotion/css";

export const modalButtons = css`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-items: space-between;
  gap: 1.2rem;
`;

export const modalMessage = css`
  padding: 2rem 0;
`;

export const removeTitleContainer = css`
  display: flex;
  padding: 2rem 0;
  gap: 1.2rem;
`;

export const lockIcon = css`
  padding-top: 0.4rem;
`;

export const spinnerContainer = css`
  padding: 2.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const signingContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const signatureTitle = css`
  color: var(--font-02);
  padding-left: 1.6rem;
  text-transform: uppercase;
`;
