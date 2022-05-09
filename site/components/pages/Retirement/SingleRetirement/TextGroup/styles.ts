import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const section = css`
  ${breakpoints.medium} {
    padding-top: 9rem;
    padding-bottom: 9rem;
  }
`;

export const retirementContent = css`
  background-color: var(--surface-01);
  border-radius: 0 0 1.2rem 1.2rem;
  grid-column: main;
  display: grid;
  gap: 2.8rem;
  padding: 2.8rem 1.5rem;

  ${breakpoints.medium} {
    gap: 5.2rem;
    padding: 5.2rem;
  }
`;

export const retirement_textGroup = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2.8rem;
  p {
    max-width: 57rem;
  }
`;

export const metaData = css`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  ${breakpoints.medium} {
    display: flex;
    justify-content: space-evenly;
    gap: 3rem;
    flex-direction: row;
  }

  .column {
    display: flex;
    gap: 4rem;
    flex-direction: column;
  }
`;

export const metaData_textGroup = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .address {
    word-break: break-all;
  }

  a,
  a:visited {
    color: var(--font-01);
    text-decoration: underline;
  }
  a:hover {
    color: var(--font-01);
    text-decoration: none;
  }
`;
