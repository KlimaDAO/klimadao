import { css } from "@emotion/css";
import { button } from "theme/typography";

export const buttonPrimary = css`
  ${button};
  background-color: var(--blue-yellow) !important;
  color: white; /* same in darkmode */

  &,
  &:hover:not(:disabled),
  &:visited {
    color: white; /* same in darkmode. same as not hovered. keep here to override hover state in lib */
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
    background-color: var(--warning-red);
    color: var(--white);
  }

  &.blue {
    background-color: var(--bright-blue);
    &:hover:not(:disabled),
    &:visited {
      color: #000; /* same in darkmode */
    }
  }

  &:disabled {
    color: var(--white);
    opacity: 0.4;
  }
`;

export const buttonSecondary = css`
  ${button};
  border: 1px solid var(--font-03);
  color: var(--font-02) !important; //ugh gross..
  background-color: transparent;

  &:hover:not(:disabled),
  &:visited {
    color: var(--bright-blue); /* same in darkmode */
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
