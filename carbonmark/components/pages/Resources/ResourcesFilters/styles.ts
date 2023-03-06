import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const filtersContainerInner = css`
  display: grid;
  padding-top: 1.6rem;
  padding-bottom: 2.4rem;
  gap: 1.8rem;
  border-top: 1px solid var(--surface-02);

  ${breakpoints.large} {
    padding: 1.6rem;
    padding-bottom: 2.4rem;
    background-color: var(--surface-01);
    border-radius: 1rem;
    box-shadow: var(--shadow-07);
  }
`;

export const filtersHeader = css`
  display: grid;
  gap: 1.2rem;
`;

export const filtersCheckboxGroup = css`
  display: grid;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
`;
