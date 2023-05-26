import { css } from "@emotion/css";

export const tweetButton = css`
  gap: 0.8rem;
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
