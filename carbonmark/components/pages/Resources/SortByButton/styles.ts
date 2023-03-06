import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const sortbyButton = css`
  display: flex;
  align-items: center;
  background-color: var(--surface-02);
  border-radius: 1rem;
  padding: 1.2rem;
  min-height: auto;
  justify-content: center;

  &:hover {
    cursor: pointer;
    color: var(--bright-blue);
  }

  &[data-active="true"] {
    color: var(--bright-blue);
  }

  ${breakpoints.large} {
    background-color: var(--surface-01);
    padding: 1rem;
    min-height: 4.8rem;
  }
`;
