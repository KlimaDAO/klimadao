import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const breakdown = css`
  grid-column: main;
  padding-bottom: 6rem;
`;

export const breakdownHeadline = css`
  grid-column: main;
  display: grid;
  gap: 1.6rem;
  padding-bottom: 2rem;

  ${breakpoints.desktop} {
    padding-bottom: 4rem;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    gap: 1rem;
  }
`;

export const breakdownList = css`
  grid-column: main;
  padding: 2rem;
  background-color: var(--surface-01);
  border-radius: 1.2rem;

  ${breakpoints.medium} {
    margin: 0 auto;
    max-width: 70%;
  }
`;

export const breakdownListItem = css`
  display: flex;
  gap: 2.4rem;
  align-items: center;
  border-bottom: 0.1rem solid var(--surface-03);
  padding-bottom: 1.6rem;
  padding-top: 1.6rem;
  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  .content {
    display: flex;
    gap: 0.8rem;
    align-items: center;
  }
`;
