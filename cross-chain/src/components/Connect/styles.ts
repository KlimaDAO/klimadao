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
