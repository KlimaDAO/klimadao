import { css } from "@emotion/css";

export const switchButtonContainer = css`
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 1.6rem;
`;

export const switchButton = css`
  border: 2px solid var(--klima-green);
  background-color: transparent !important;

  :hover {
    opacity: 0.6;
  }
`;
