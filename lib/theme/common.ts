import { css } from "@emotion/css";
import breakpoints from "./breakpoints";
import { button } from "./typography";

export const cardSurface = css`
  position: relative;
  display: grid;
  background-color: var(--surface-02);
  border-radius: 1.2rem;
  padding: 2.4rem;
  gap: 2.4rem;

  ${breakpoints.desktopLarge} {
    padding: 3.2rem;
  }
`;

export const textButton = css`
  ${button};
  display: flex;
  min-height: 4rem;
  align-items: center;
  color: var(--font-01);
  border: 2px solid var(--surface-03);
  padding: 0.8rem 1.2rem;
  border-radius: 0.4rem;
  align-items: center;
  align-content: center;
  background-color: rgb(0, 0, 0, 0.3);
  &:visited {
    color: var(--font-01);
  }
  &:not(:disabled):hover {
    border-color: var(--klima-green);
  }
  &[data-active="true"] {
    background-color: var(--klima-green);
    border-color: var(--klima-green);
  }
  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
  ${breakpoints.small} {
    padding: 0.8rem 1.6rem;
  }
`;

/** Container for a button with a centered icon */
export const iconButton = css`
  background-color: var(--surface-01);
  min-height: 4.8rem;
  min-width: 4.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.8rem;
  svg {
    font-size: 2.4rem;

    path {
      fill: var(--font-01);
    }
  }
  &:hover {
    opacity: 0.7rem;
  }
`;

export const darkTextButton = css`
  [data-theme="theme-dark"] & {
    color: #000 !important;
  }
`;
