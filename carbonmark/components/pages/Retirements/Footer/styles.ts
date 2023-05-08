import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const section = css`
  padding-top: 4rem;
  padding-bottom: 4rem;

  ${breakpoints.medium} {
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
`;

export const retirementFooter = css`
  grid-column: main;
  display: grid;
  gap: 2.8rem;
`;

export const footerContent = css`
  display: flex;
  flex-direction: column;
  gap: 4rem;

  ${breakpoints.medium} {
    display: flex;
    justify-content: space-between;
    gap: 3rem;
    flex-direction: row;
  }

  .column {
    flex: 1;
    display: flex;
    gap: 4rem;
    flex-direction: column;
  }
`;
