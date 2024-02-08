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

  &.transparentBG {
    ${breakpoints.desktop} {
      width: 104rem;
      margin: 4rem auto;
    }
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

export const fullWidth = css`
  grid-column: full;
  display: grid;
  grid-template-columns: inherit;

  &.whiteBG {
    background-color: var(--white);
    ${breakpoints.desktop} {
      display: flex;
      justify-content: space-between;

      > div {
        width: 104rem;
        margin: 4rem auto;
      }
    }
  }
`;

export const content = css`
  grid-column: main;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 4rem 1.6rem;

  ${breakpoints.large} {
    margin: 4rem 2rem;
  }

  ${breakpoints.desktop} {
    margin: 4rem;
  }

  &.transparentBG {
    ${breakpoints.desktop} {
      width: 104rem;
      margin: 4rem auto;
    }
  }
`;

export const featuredCard = css`
  background-color: var(--yellow);
  border: 0.4rem solid var(--yellow);
`;

export const sectionTitle = css`
  display: grid;
  gap: 0rem;

  ${breakpoints.large} {
    gap: 0.4rem;
  }
`;

export const cardsHeader = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;

  ${breakpoints.large} {
    gap: 2.4rem;
    align-items: baseline;
    flex-direction: row;
  }

  ${breakpoints.desktop} {
    justify-content: space-between;
  }
`;

export const cardsHeaderTweakAlignment = css`
  display: flex;
  gap: 0.8rem;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  flex-direction: column;

  ${breakpoints.large} {
    gap: 2.4rem;
    flex-direction: row;
  }

  ${breakpoints.desktop} {
    justify-content: space-between;
  }

  span {
    margin-top: 5px;
  }
`;

export const textWithIcon = css`
  display: flex;
  gap: 0.4rem;
  align-items: center;

  .featured {
    height: 3rem;
    width: 3rem;
    bottom: -4px;
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
  padding: 1.6rem 2rem 0;

  ${breakpoints.desktop} {
    text-align: inherit;
    padding: 0;
  }
`;

export const cardsList = css`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  justify-content: center;

  ${breakpoints.desktop} {
    justify-content: space-between;
  }
`;
