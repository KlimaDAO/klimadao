import { css } from "@emotion/css";

export const facebookButton = css`
  gap: 0.8rem;
  text-transform: none;

  & svg path {
    fill: var(--font-02);
  }

  &:hover {
    opacity: 0.7;
  }
`;
