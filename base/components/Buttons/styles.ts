import { css } from "@emotion/css";
import { button } from "@klimadao/lib/theme/typography";

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
  border: none;

  &.rounded {
    border-radius: 0.8rem;
  }

  &.circle {
    border-radius: 100%;
    padding: 1.5rem;
  }

  &.icon {
    gap: 0.8rem;
    // @note overriding the styles defined in:
    // app/components/views/Home/styles.ts
    svg.MuiSvgIcon-root {
      width: 1em;
      height: 1em;
    }
  }
  &.suffix {
    flex-direction: row-reverse;
  }

  &.transparent {
    border: 1px solid grey;
    background: transparent;
  }
`;

export const buttonPrimary = css`
  ${buttonBase};
  background-color: var(--klima-green);
  color: white; /* same in darkmode */

  &:active:not(:disabled) {
    transform: scale(0.95);
    opacity: 0.6;
  }

  &,
  &:hover:not(:disabled),
  &:visited {
    color: #000; /* same in darkmode */
  }

  &.gray {
    background-color: var(--surface-01);

    &,
    &:hover:not(:disabled),
    &:visited {
      color: var(--font-02); /* same in darkmode */
    }
  }

  &.lightGray {
    background-color: var(--surface-01);

    &,
    &:hover:not(:disabled),
    &:visited {
      color: var(--font-02); /* same in darkmode */
    }
  }

  &.red {
    background-color: var(--warn);
    color: var(--white);
  }

  &.blue {
    background-color: var(--klima-blue);
    &:hover:not(:disabled),
    &:visited {
      color: #000; /* same in darkmode */
    }
  }

  &:disabled {
    background-color: var(--surface-03);
    color: var(--font-03);
    cursor: not-allowed;
  }
`;

export const buttonSecondary = css`
  ${buttonBase};
  border: 1px solid var(--klima-green);
  color: var(--klima-green);
  background-color: transparent;

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

  &.lightGray {
    background-color: var(--surface-01);
    box-shadow: var(--shadow-07);
    &,
    &:hover,
    &:hover:not(:disabled),
    &:visited {
      color: var(--font-02); /* same in darkmode */
    }
  }

  &.red {
    border-color: var(--warn);
    color: var(--warn);
    &,
    &:hover,
    &:hover:not(:disabled),
    &:visited {
      color: var(--warn);
    }
  }

  &.blue {
    border-color: var(--klima-blue);

    &,
    &:hover,
    &:hover:not(:disabled),
    &:visited {
      color: var(--klima-blue); /* same in darkmode */
    }
  }
`;
