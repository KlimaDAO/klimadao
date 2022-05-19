import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const section = css`
  padding-bottom: 0;
  ${breakpoints.medium} {
    padding-top: 9rem;
    padding-bottom: 0;
  }
`;

export const pageHeadline = css`
  grid-column: main;
  display: grid;
  gap: 2.8rem;
  padding-bottom: 5rem;
  ${breakpoints.medium} {
    gap: 5.2rem;
  }

  .textGroup {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 2.8rem;
    p {
      max-width: 57rem;
    }
  }
`;

export const cards = css`
  grid-column: main;
  display: grid;
  gap: 2.8rem;
  padding-bottom: 5rem;

  ${breakpoints.medium} {
    grid-auto-columns: minmax(0, 1fr);
    grid-auto-flow: column;
  }
`;

export const card = css`
  display: grid;
  background-color: var(--surface-01);
  border-radius: 1.2rem;
  padding: 2.4rem;
  gap: 1.6rem;
  justify-content: center;
  align-content: center;

  ${breakpoints.desktop} {
    padding: 3.2rem;
  }

  .headline {
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    gap: 1rem;
  }
`;

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

  ${breakpoints.desktop} {
    display: grid;
    grid-auto-columns: minmax(0, 1fr);
    grid-auto-flow: column;
    max-width: 100%;
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

    ${breakpoints.desktop} {
      gap: 0em;
      flex-direction: column;
    }
  }

  ${breakpoints.desktop} {
    padding-top: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`;
