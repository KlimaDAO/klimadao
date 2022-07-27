import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const tokenCardContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

export const tokenRowContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

export const divider = css`
  height: 0.15rem;
  width: 100%;
  opacity: 0.3;
  background-color: var(--font-03);
`;
