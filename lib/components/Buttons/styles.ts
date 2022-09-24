import { css } from "@emotion/css";
import { button } from "../../theme/typography";

const buttonBase = css`
  ${button};
  display: flex;
  padding: 0rem 2.4rem;
  align-items: center;
  justify-content: center;
  appearance: none;
  text-decoration: none;
  text-align: center;
  /* min-height to conform with Lighthouse min tap-target */
  min-height: 4.8rem;
  cursor: pointer;
  border-radius: 0.4rem;
  transition: opacity 0.3s ease 0s;
`;

export const buttonPrimary = css`
  ${buttonBase};
  background-color: var(--klima-green);

  &:active:not(:disabled) {
    transform: scale(0.95);
    opacity: 0.6;
  }

  &,
  &:hover:not(:disabled),
  &:visited {
    color: white; /* same in darkmode */
  }

  &:disabled {
    background-color: var(--surface-03);
    cursor: not-allowed;
  }

  &.icon {
    gap: 0.8rem;
  }

  &.gray {
    background-color: var(--surface-01);

    &,
    &:hover,
    &:hover:not(:disabled),
    &:visited {
      color: var(--font-02); /* same in darkmode */
    }
  }

  &.blue,
  &.blueRounded {
    background-color: var(--klima-blue);
  }

  &.blueRounded {
    border-radius: 0.8rem;

    &,
    &:hover,
    &:hover:not(:disabled),
    &:visited {
      color: var(--surface-01); /* same in darkmode */
    }
  }
`;

export const buttonSecondary = css`
  ${buttonBase}
  border: 1px solid var(--klima-green);
  color: var(--klima-green);
  border-radius: 0.4rem;
  background-color: transparent;
  text-decoration: none;
  &,
  &:hover:not(:disabled),
  &:visited {
    color: var(--klima-green); /* same in darkmode */
  }

  &.gray {
    border-color: var(--surface-01);

    &,
    &:hover,
    &:hover:not(:disabled),
    &:visited {
      color: var(--font-01); /* same in darkmode */
    }
  }

  &.blue,
  &.blueRounded {
    border-color: var(--klima-blue);

    &,
    &:hover,
    &:hover:not(:disabled),
    &:visited {
      color: var(--klima-blue); /* same in darkmode */
    }
  }

  &.blueRounded {
    border-radius: 0.8rem;
  }
`;
