import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  grid-column: main;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 2.4rem;

  margin: 1.6rem;

  ${breakpoints.desktop} {
    margin: 4rem;
  }
`;

export const retireControls = css`
  grid-column: main;
  flex-direction: row-reverse;
  display: none;

  ${breakpoints.desktop} {
    display: flex;
  }
`;

export const beneficiary = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;

  .highlight {
    color: var(--bright-blue);
  }

  .copyButton {
    background: none;
    background-color: transparent !important;
    svg path {
      fill: var(--bright-blue);
    }
  }
`;

export const fullWhite = css`
  grid-column: full;

  display: grid;
  grid-template-columns: inherit;
  background-color: var(--white);
`;

export const content = css`
  grid-column: main;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem 1.6rem;

  ${breakpoints.large} {
    margin: 4rem 2rem;
  }

  ${breakpoints.desktop} {
    margin: 4rem;
  }
`;

export const featuredCard = css`
  border: 2px solid var(--yellow);
`;

export const cardsHeader = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;

  ${breakpoints.large} {
    gap: 2.4rem;
  }

  ${breakpoints.desktop} {
    justify-content: space-between;
  }
`;

export const textWithIcon = css`
  display: flex;
  gap: 0.4rem;
  align-items: center;

  .featured {
    path {
      fill: var(--yellow);
    }
  }
`;

export const textLink = css`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  color: var(--bright-blue);
  text-transform: uppercase;

  &:hover,
  &:visited {
    text-decoration: underline;
  }
`;

export const cardsDescription = css`
  text-align: center;
  padding: 0 2rem;

  ${breakpoints.desktop} {
    text-align: inherit;
    padding: 0;
  }
`;

export const cardsList = css`
  display: flex;
  gap: 2rem;
`;
