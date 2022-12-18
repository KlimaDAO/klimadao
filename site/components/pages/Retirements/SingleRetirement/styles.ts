import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const section = css`
  padding-bottom: 4rem;
  ${breakpoints.medium} {
      padding-top: 4rem;
      padding-bottom: 4rem;
    }
  }
`;

export const retirementContent = css`
  background-color: var(--surface-01);
  border-radius: 0 0 1.2rem 1.2rem;
  grid-column: main;
  display: grid;
  grid-template-columns: 1fr [center] minmax(0, 60rem) 1fr;
  gap: 2.8rem;
  padding: 2.8rem 1.5rem;

  ${breakpoints.medium} {
    gap: 5.2rem;
    padding: 5.2rem;
  }

  > * {
    grid-column: center;
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
    // standardize column sizes
    max-width: 30rem;
  }
`;

export const data_description = css`
  margin: 0 auto;
`;

export const create_pledge = css`
  a {
    margin-left: 0.5rem;
  }
`;

export const pledge_button = css`
  display: grid;
  gap: 1.6rem;
`;

export const sectionButtons = css`
  padding: 2.8rem 0 !important;
  grid-column: full;
`;

export const sectionButtonsWrap = css`
  grid-column: main;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2.8rem;
  padding: 0rem 1.5rem;

  ${breakpoints.medium} {
    flex-direction: row;
    padding: 0rem 1.5rem;
  }
`;

export const buttonViewOnPolygon = css`
  //Not sure where the uppercase is being defined so we need to force override it here
  text-transform: none;
  &:hover {
    opacity: 0.7; // same styles as of for CopyButton
  }
`;

export const share_content = css`
  display: grid;
  gap: 2.4rem;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 7rem;
  grid-column: main;

  .title {
    text-align: center;
    position: relative;
    line-height: initial;
    color: var(--white);
  }

  .buttons {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;
    button {
      font-size: 2rem;
    }
    svg {
      color: var(--font-01);
    }
  }

  .image {
    border-radius: 1.2rem;
    // Simulate a rgba(0,0,0,0.4) overlay
    filter: grayscale(20%) brightness(0.7);
  }
`;

export const footerBuyKlima = css`
  position: relative;
  overflow: hidden;

  grid-column: main;
  padding: 8rem 2.4rem 6rem;
  border-radius: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2.5rem;

  ${breakpoints.medium} {
    padding: 8rem 5.2rem 6rem;
    justify-content: start;
    align-items: start;
  }
`;

export const buyKlimaImageGradient = css`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const footerBuyKlimaText = css`
  z-index: 2;
  color: var(--white);
  ${breakpoints.large} {
    max-width: 70%;
  }
`;

export const footerButtons = css`
  z-index: 2;
  padding-top: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2.5rem;
  ${breakpoints.medium} {
    flex-direction: row;
    justify-content: start;
    align-items: start;
  }
`;
