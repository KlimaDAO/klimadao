import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const card = css`
  box-shadow: var(--shadow-01);
  width: 100%;
  line-height: 1.15;
  transition: 0.25s ease-in-out;
  background-color: var(--surface-01);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-01);
  padding: 1.6rem;
  display: flex;
  gap: 1.6rem;
  flex-direction: column;

  ${breakpoints.medium} {
    max-width: 33rem;
  }
  ${breakpoints.large} {
    transition: all 0.2s ease 0s;
    &:hover {
      transform: scale(0.98);
      box-shadow: var(--shadow-02);
    }
  }
`;

export const image = css`
  position: relative;
  overflow: hidden;

  min-height: 12rem;
`;

export const tags = css`
  display: flex;
  gap: 1.6rem;
  flex-direction: row;
`;

export const belowHeadline = css`
  display: grid;
  gap: 1rem;
  margin-top: auto;
`;
