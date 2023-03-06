import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const checkboxContainer = css`
  display: flex;
  gap: 1.6rem;
  background-color: var(--surface-02);
  border-radius: 0.8rem;
  padding: 1.2rem;
  align-items: center;
`;

export const baseStyles = css`
  display: grid;
  grid-template-columns: 1em auto;

  /* Add if not using autoprefixer */
  -webkit-appearance: none;
  /* Remove most all native input styles */
  appearance: none;
  /* For iOS < 15 */
  background-color: var(--white);
  /* Not removed via appearance */
  margin: 0;

  width: 1.6rem;
  height: 1.6rem;
  border: 0.1rem solid var(--bright-blue);
  border-radius: 0.15em;
  transform: translateY(-0.08rem);

  display: grid;
  place-content: center;

  cursor: pointer;

  &:checked {
    background-color: var(--bright-blue);
  }

  &::before {
    content: "";
    width: 1rem;
    height: 1rem;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em var(--white);
    /* Windows High Contrast Mode */
    background-color: CanvasText;
    margin-left: 0.3rem;
  }

  &:checked::before {
    transform: scale(1);
  }

  &:disabled {
    color: var(--gray);
    cursor: not-allowed;
  }
`;

export const errorStyles = css`
  border-color: var(--warn);
  &:focus,
  &:hover {
    border-color: var(--warn);
  }
`;

export const errorMessage = css`
  font-size: 1.2rem;
  line-height: 1.4rem;
  font-weight: 400;
  color: var(--warn);
  margin-bottom: 0.2rem;
  word-break: break-word;

  ${breakpoints.large} {
    font-size: 1.4rem;
    line-height: 1.6rem;
    margin-bottom: 0.8rem;
  }
`;

export const label = css`
  flex: 1;
  cursor: pointer;
`;
