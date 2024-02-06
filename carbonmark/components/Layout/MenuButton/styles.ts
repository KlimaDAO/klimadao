import { css } from "@emotion/css";
import * as typography from "theme/typography";

export const menuButton = css`
  ${typography.body1};
  display: flex;
  align-items: center;
  gap: 1.6rem;
  justify-content: space-between;
  padding: 0.1rem 0.5rem;
  width: 100%;
  padding: 0.8rem;

  button {
    width: 100%;
  }

  .container {
    gap: 1.2rem;
    display: flex;
    align-items: center;

    span {
      ${typography.body4};
      color: var(--font-02);
    }
  }

  .iconContainer {
    color: var(--font-02);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.2rem;
    width: 3.2rem;
    background-color: var(--surface-02);
    border-radius: 0.6rem;
  }

  svg {
    width: 2rem;
    height: 2rem;
    font-size: 2rem;
    color: var(--font-03);
  }

  &:hover,
  &:focus {
    background-color: var(--surface-02);

    .iconContainer {
      background-color: var(--bright-blue);

      svg {
        fill: var(--surface-01);
      }
    }
  }

  &:hover span,
  &:focus span {
    color: var(--font-02);
  }

  &[data-active="true"] {
    background-color: var(--surface-02);
    border: 1px solid var(--surface-03);
  }

  &[data-active="true"] span {
    color: var(--font-01);
  }

  &[data-active="true"] .iconContainer {
    background-color: var(--bright-blue);

    svg {
      fill: var(--surface-01);
    }
  }

  &[data-disabled="true"] {
    opacity: 0.5;
  }
`;
