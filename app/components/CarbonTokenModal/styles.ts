import { css } from "@emotion/css";

export const container = css`
  gap: 1rem;
  display: flex;
  flex-direction: column;
`;

export const item = css`
  width: 100%;
  gap: 0.8rem;
  padding: 1.2rem;
  display: flex;
  cursor: pointer;
  flex-direction: column;
  border-radius: 0.8rem;
  background: transparent;
  border: 1px solid var(--font-03);
`;

export const incompatible = css`
  opacity: 0.4;
  pointer-events: none;
`;

export const incompatibleBadge = css`
  max-width: fit-content;
  // height: 2.3rem;
  background: var(--white);
  border-radius: 0.4rem;
  font-size: 1.2rem;
  font-weight: 700;
  padding: 0.5rem 0.9rem;
`;

export const tokenText = css`
  font-weight: 700;
  font-size: 1.6rem !important;
  line-height: 2rem !important;
  color: var(--white);
`;

export const tonnesText = css`
  font-weight: 400;
  font-size: 1.4rem !important;
  line-height: 1.6rem !important;
  color: var(--font-03);
`;
