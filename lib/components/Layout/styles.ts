import { css } from "@emotion/css";
import breakpoints from "../../theme/breakpoints";

export const gridContainer = css`
  display: grid;
  overflow: hidden;
  grid-template-columns:
    [full-start] minmax(1.6rem, 1fr)
    [main-start] minmax(0, 107.2rem)
    [main-end] minmax(1.6rem, 1fr)
    [full-end];

  ${breakpoints.small} {
    grid-template-columns:
      [full-start] minmax(3.2rem, 1fr)
      [main-start] minmax(0, 107.2rem)
      [main-end] minmax(3.2rem, 1fr)
      [full-end];
  }
`;

export const section = css`
  grid-column: full;
  display: grid;
  grid-template-columns: inherit;
  background-color: var(--surface-01);
  padding: 8.4rem 0rem;

  &.darkgray {
    background-color: #202020;
  }
  &.gray {
    background-color: var(--surface-02);
  }
  &.black {
    background-color: #000;
  }
  &.fillViewport {
    min-height: 100vh;
    align-items: center;
  }
  ${breakpoints.large} {
    padding: 15.2rem 0rem;
  }
`;
