import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const loginControls = css`
  grid-column: main;
  display: flex;
  flex-direction: row-reverse;
`;

export const loginContent = css`
  grid-column: main;
  display: grid;
  gap: 2.4rem;
  ${breakpoints.desktop} {
    grid-template-columns: 2fr 1fr;
  }
`;

export const fullWidth = css`
  grid-column: main;
  display: flex;
  gap: 2rem;
`;

export const login = css`
  grid-column: main;
  display: flex;
  gap: 1.6rem;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding: 2.4rem;
  ${breakpoints.desktop} {
    gap: 2.4rem;
    padding: 2.4rem 4rem;
  }
`;

export const title = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  svg {
    fill: var(--font-02);
  }
`;

export const loginButton = css`
  width: 100%;
`;
