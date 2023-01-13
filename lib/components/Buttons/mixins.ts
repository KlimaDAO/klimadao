import { css } from "@emotion/css";

export const transparent = css`
  background: none;
  padding: 0;

  &:hover {
    opacity: 0.7;
  }

  &,
  &:hover:not(:disabled),
  &:visited {
    color: inherit; /* override force to white */
  }
`;
