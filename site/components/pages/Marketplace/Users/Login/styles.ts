import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const fullWidth = css`
  display: flex;
  gap: 2rem;
`;

export const main = css`
  display: grid;
  gap: 2.4rem;
  grid-column: 1 / 3;
  ${breakpoints.desktop} {
    grid-area: 2;
  }
`;

export const aside = css`
  display: grid;
  gap: 2.4rem;
  grid-column: 1 / 3;
  ${breakpoints.desktop} {
    grid-column: 2 / 3;
  }
`;

export const card = css`
  background-color: var(--surface-01);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-01);
  padding: 1.6rem;
`;

export const login = css`
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

export const redirecting = css`
  color: var(--klima-green);
`;
