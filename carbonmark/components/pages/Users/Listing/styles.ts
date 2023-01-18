import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const image = css`
  position: relative;
  overflow: hidden;

  min-height: 12rem;

  ${breakpoints.medium} {
    min-height: 25rem;
  }
`;

export const tags = css`
  display: flex;
  gap: 1.6rem;
  flex-direction: row;
`;

export const category = css`
  display: flex;
  gap: 1.2rem;
  flex-direction: row;
  border-radius: var(--border-radius);
  padding: 0.4rem 0.8rem;
`;

export const amounts = css`
  display: flex;
  gap: 1.2rem;
  flex-direction: row;
  justify-content: space-between;
`;
