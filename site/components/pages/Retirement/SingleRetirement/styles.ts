import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const section = css`
  padding-bottom: 4rem;
  ${breakpoints.medium} {
    padding-top: 9rem;
    padding-bottom: 4rem;
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

export const data_description = css`
  margin: 0 auto;
  ${breakpoints.medium} {
    max-width: 75%;
  }
`;
