import { css } from "@emotion/css";

export const connectWrapper = css`
  opacity: 0;
  pointer-events: none;
  user-select: none;
`;

export const buttons = css`
  display: flex;
  gap: 1.2rem;

  & button {
    display: flex;
    align-items: center;

    & .icon {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 0.2rem;

      & img {
        width: 2rem;
        height: 2rem;
      }
    }
  }
`;

export const connectButton = css`
  height: 4.8rem;
  min-width: 4.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  gap: 0.8rem;
  &:hover {
    opacity: 0.7;
  }
`;

export const networkSwitchButton = css`
  background-color: var(--surface-02);
  border: 3px solid var(--surface-02);
  min-height: 4.9rem;
  min-width: 4.8rem;
  padding: 0 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.4rem;
  gap: 0.8rem;
  color: white !important;
  &:hover {
    opacity: 0.7;
  }
  &:hover:not(:disabled) {
    color: white !important;
  }
`;
