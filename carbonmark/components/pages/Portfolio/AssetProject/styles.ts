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

export const tonnes = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const tags = css`
  display: flex;
  gap: 1.6rem;
  flex-direction: row;
`;

export const buttons = css`
  display: flex;
  gap: 2rem;

  & a {
    color: var(--white);
  }
`;
export const link = css`
  color: black;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: blue;
  }
`;

export const disabled = css`
  opacity: 0.4;
  cursor: not-allowed;

  & a {
    pointer-events: none;
  }
`;
