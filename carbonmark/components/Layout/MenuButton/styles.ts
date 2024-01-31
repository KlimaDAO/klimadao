import { css } from "@emotion/css";
import * as typography from "theme/typography";

export const menuButton = css`
  ${typography.body1};
  display: flex;
  align-items: center;
  gap: 1.6rem;
  padding: 0.1rem 0.5rem;
  width: 100%;
  padding: 0.8rem;

  span {
    color: var(--font-03);
  }

  .iconContainer {
    color: var(--font-02);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 3.8rem;
    width: 3.8rem;
    background-color: var(--surface-02);
    border-radius: 0.6rem;

    svg {
      font-size: 2.4rem;
      width: 2.4rem;
      height: 2.4rem;
    }
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
