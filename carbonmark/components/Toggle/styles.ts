import { css } from "@emotion/css";

export const main = css`
  display: flex;
  height:100%:

`;

export const button = css`
  height: 100%;
  width: 4.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  padding: 1.4rem;
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
    background: var(--klima-blue);
  }
`;
