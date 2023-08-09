import { css } from "@emotion/css";

export const main = css`
  display: flex;
`;

export const button = css`
  width: 4.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.2rem;
  background: var(--surface-01);
  color: var(--font-01);

  // Round the corners of our first button
  &:first-of-type {
    border-radius: var(--border-radius) 0 0 var(--border-radius);
  }

  // Round the corners of our last button
  &:last-of-type {
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
  }

  &.selected {
    color: white;
    background: var(--manatee);
  }
`;
