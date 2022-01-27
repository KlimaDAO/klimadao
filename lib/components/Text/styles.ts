import { css } from "@emotion/css";

export const text = css`
  color: var(--font-01);
  text-align: start;
  &[data-align="center"] {
    text-align: center;
  }
  &[data-align="end"] {
    text-align: end;
  }
  &[data-color="lighter"] {
    color: var(--font-02);
  }
  &[data-color="lightest"] {
    color: var(--font-03);
  }
`;
