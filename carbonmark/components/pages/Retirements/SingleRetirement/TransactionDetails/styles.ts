import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const details = css`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.4rem;
`;

export const gridLayout = css`
  display: grid;
  max-width: 80%;
  column-gap: 4rem;
  grid-column: main;
  margin-top: 1.4rem;

  & .column {
    row-gap: 0 !important;
  }

  ${breakpoints.desktop} {
    grid-template-columns: 1.25fr 1fr;
  }
`;

export const content = css`
  display: flex;
  align-items: center;
  gap: 1.6rem;
  margin-bottom: 1.4rem;
`;

export const textGroup = css`
  gap: 0.1rem;
  display: flex;
  margin-bottom: 0.8rem;
  flex-direction: column;

  & p {
    font-size: 1.2rem;

    :last-child {
      font-size: 1.4rem;
    }
  }

  &.row {
    gap: 0.8rem;
    flex-direction: row;
    align-items: center;
  }
`;
