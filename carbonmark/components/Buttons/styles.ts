import { css } from "@emotion/css";
import { button } from "theme/typography";

export const buttonPrimary = css`
  ${button};
  background-color: var(--blue-yellow);
  color: white; /* same in darkmode */

  &,
  &:hover:not(:disabled),
  &:visited {
    color: var(--surface-02); /* same in darkmode */
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
    background-color: var(--surface-02);
    color: var(--font-03);
  }
`;
