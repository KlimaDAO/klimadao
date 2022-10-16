import { css } from "@emotion/css";

export const checkboxWrapper = css`
  display: inline-block;
  position: relative;
`;

export const checkboxInput = css`
  position: absolute;
  opacity: 0;
  width: 2.4rem;
  height: 2.4rem;
  cursor: pointer;
`;

export const checkboxBorder = css`
  display: inline-block;
  width: 2.4rem;
  height: 2.4rem;
  margin-right: 0.8rem;
  background-color: var(--surface-02);
  border-radius: 0.2rem;
  border: 0.1rem solid var(--font-02);
  transition: background-color 0.2s ease-in;

  input:focus + &,
  input:hover + & {
    border-color: var(--klima-green);
  }

  input:checked + & {
    background-color: var(--klima-green);
    border-color: var(--klima-green);
  }
`;

export const icon = css`
  position: absolute;
  display: none;
  color: var(--white);
  padding: 0.8rem;
  top: -0.9rem;
  left: -0.9rem;

  input:checked ~ & {
    display: block;
    height: 4.1rem;
    width: 4.1rem;
  }
`;
