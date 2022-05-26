import { css } from "@emotion/css";
import * as typography from "@klimadao/lib/theme/typography";

export const inputContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  width: 70rem;
`;

export const container = css`
  grid-column: main;
  height: 85vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const errorMessage = css`
  color: var(--warn);
  margin-bottom: 1rem;
`;

export const input = css`
  ${typography.body1}
  display: block;
  width: 100%;
  min-height: 4.8rem;
  color: var(--font-01);
  background-color: var(--surface-01);
  outline: none;
  border: none;
  border-bottom: 0.1rem solid var(--font-03);
  text-align: center;
  transition: border-bottom 0.25s ease-in-out;

  :hover,
  :focus {
    border-bottom: 0.1rem solid var(--klima-green);
  }

  &[data-error="true"] {
    border-bottom: 0.1rem solid var(--warn);
  }
`;
