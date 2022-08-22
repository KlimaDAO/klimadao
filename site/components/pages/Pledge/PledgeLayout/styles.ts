import { css } from "@emotion/css";
import bgDots from "./bg-dots.svg";

export const pageContainer = css`
  grid-column: full;
  min-height: 100vh;
  display: grid;
  align-content: start;
  grid-template-columns: inherit;
  padding: 4rem 0;
  background-color: var(--surface-01);

  background: url(${bgDots.src}) center 120px no-repeat;

  [data-theme="theme-dark"] & {
    background: url(${bgDots.src}) center 120px no-repeat,
      linear-gradient(165.47deg, #3d3d3d 3.96%, #1f1f1f 60.29%);
  }
`;

export const headerContainer = css`
  grid-column: main;
`;
