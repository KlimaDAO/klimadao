import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

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
