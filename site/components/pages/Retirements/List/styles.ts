import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const allRetirements = css`
  grid-column: main;
  padding-bottom: 5rem;
`;

export const allRetirementsHeadline = css`
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

export const allRetirementsList = css`
  grid-column: main;
  padding: 1rem;
  display: grid;
  background-color: var(--surface-01);
  border-radius: 1.2rem;

  ${breakpoints.medium} {
    padding: 3rem;
  }
`;

export const allRetirementsListItem = css`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  border-bottom: 0.1rem solid var(--font-03);
  padding-bottom: 2rem;
  padding-top: 2rem;

  ${breakpoints.medium} {
    gap: 4rem;
  }

  &:hover {
    opacity: 0.5;
  }

  &:first-child {
    padding-top: 0;
  }
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  .arrow-icon {
    margin-left: auto;
    color: var(--klima-green);
    width: 2.4rem;
    height: 2.4rem;
  }

  .number {
    width: 3.2rem;
  }
`;
