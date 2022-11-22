import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const card = css`
  background-color: var(--surface-01);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-01);
  padding: 1.6rem;
  display: flex;
  gap: 1.6rem;
  flex-direction: column;
`;

export const list = css`
  display: grid;
  gap: 1.2rem;
`;

export const listItem = css`
  display: flex;
  flex-direction: row;
  gap: 1.2rem;
  ${breakpoints.desktop} {
    justify-content: space-between;
  }
`;

export const itemWithIcon = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  svg {
    fill: var(--font-02);
  }
`;
