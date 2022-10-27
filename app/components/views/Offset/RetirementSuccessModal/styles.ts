import { css } from "@emotion/css";

export const modalContent = css`
  display: grid;
  gap: 1.6rem;
  .success {
    display: flex;
    gap: 0.8rem;
    justify-content: center;
    align-items: center;
    svg {
      color: var(--klima-green);
    }
  }
`;
