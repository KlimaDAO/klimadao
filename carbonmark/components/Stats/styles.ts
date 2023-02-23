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

export const itemWithColor = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;

  span {
    position: relative;
    padding-left: 2.5rem;
  }

  span:before {
    position: absolute;
    content: "";
    width: 1.8rem;
    height: 1.8rem;
    top: 0;
    left: 0;
    background-color: var(--yellow);
  }

  span.first:before {
    background-color: var(--old-burgundy);
  }
`;

export const bar = css`
  height: 20px;
  background-color: var(--yellow);
  border-radius: var(--border-radius);

  &::before {
    content: "";
    display: flex;
    justify-content: end;
    width: calc(var(--percent) * 1%);
    height: 100%;
    background: var(--old-burgundy);
    white-space: nowrap;
    box-shadow: var(--shadow-01);
    border-radius: var(--border-radius);
  }
`;
