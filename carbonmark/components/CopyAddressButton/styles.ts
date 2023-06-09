import { css } from "@emotion/css";

export const copyButton = css`
  gap: 0.8rem;
  padding: 1.5rem;
  text-transform: none;
  background-color: var(--font-02);

  svg,
  svg path {
    fill: white;
  }

  &:hover {
    opacity: 0.7;
  }
`;
