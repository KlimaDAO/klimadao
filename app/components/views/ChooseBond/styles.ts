import { css } from "@emotion/css";
// import * as typography from "@klimadao/lib/theme/typography";
// import * as common from "@klimadao/lib/theme/common";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const chooseBondCard = css`
  position: relative;
  display: grid;
  background-color: var(--surface-02);
  border-radius: 1.2rem;
  padding: 2.4rem;
  gap: 2.4rem;
  align-content: start;

  .hr {
    height: 2px;
    background-color: var(--surface-01);
  }

  ${breakpoints.medium} {
    gap: 3.2rem;
  }

  ${breakpoints.desktop} {
    grid-column: cardsleft;
    grid-row: 2 / span 3;
    gap: 4.8rem;
    grid-template-rows: 1fr 1fr 1fr;
    align-items: start;
    /* hacky fix to keep grid-rows from collapsing on short screens */
    min-height: 88rem;
  }

  ${breakpoints.desktopLarge} {
    padding: 3.2rem;
  }
`;

export const chooseBondCard_header = css`
  display: grid;
  gap: 0.8rem;
  max-width: 38rem;
`;

export const chooseBondCard_ui = css`
  display: grid;
  gap: 2.4rem;
  ${breakpoints.medium} {
    border: 2px solid var(--surface-01);
    padding: 2.4rem;
    border-radius: 1.2rem;
  }
  ${breakpoints.desktop} {
    gap: 3.2rem;
    padding: 3.2rem;
    max-width: 56rem;
    justify-self: center;
    width: 100%;
  }
`;

export const chooseBondCard_header_title = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const data_container = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;

export const data_column = css`
  .price-data {
    color: var(--secondary);
    display: flex;
    gap: 0.4rem;
    justify-content: flex-start;
    align-items: flex-end;
  }
`;

export const bondList = css`
  display: grid;
  gap: 0.8rem;
`;
export const bondList_columnTitle = css`
  display: flex;
  justify-content: space-between;
`;
export const bondLink = css`
  display: grid;
  border-radius: 0.6rem;
  grid-template-columns: 1fr auto;
  background-color: var(--surface-01);
  padding: 1.6rem;
  border: 1px solid transparent;
  color: white;
  &:hover {
    border: 1px solid var(--klima-green);
    background-color: var(--surface-03);
  }
  > div {
    display: grid;
    gap: 0.4rem;
  }
`;

export const bondROI = css`
  justify-self: center;
  align-self: center;
  &[data-hide="true"] {
    opacity: 0.4;
  }
`;
