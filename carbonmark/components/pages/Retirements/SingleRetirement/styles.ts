import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const section = css`
  padding-bottom: 4rem;
  ${breakpoints.medium} {
      padding-top: 6.8rem;
      padding-bottom: 4rem;
    }
  }
`;

export const gridLayout = css`
  display: grid;
  grid-column: main;

  column-gap: 4rem;
  ${breakpoints.desktop} {
    grid-template-columns: 1.25fr 1fr;
  }

  & .column {
    row-gap: 0 !important;
  }
`;

export const retirementContent = css`
  background-color: var(--surface-02);
  display: flex;
  gap: 1.6rem;
  padding: 2rem;
  margin: 2rem 0 2rem;

  // ${breakpoints.medium} {
  //   gap: 5.2rem;
  //   padding: 5.2rem;
  // }
`;

export const profileLogo = css`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  .imgUrl {
    object-fit: fill;
    border-radius: 50%;
    width: 8rem;
    height: 8rem;
  }

  &.hasBorder {
    border: 1px solid gray;
  }

  .placeholderIcon {
    width: 4.8rem;
    height: 4.8rem;
    color: var(--manatee);
  }
`;

export const textGroup = css`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;

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

export const mutableTextGroup = css`
  gap: 0.1rem;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.8rem;
`;

export const mutableTextGroupHorizontal = css`
  gap: 0.8rem;
  display: flex;
  flex-direction: row;
  margin-bottom: 0.8rem;
  align-items: center;
`;

export const retirementHeader = css`
  position: relative;
  overflow: hidden;
  grid-column: main;
  padding: 2.4rem 1.6rem;
  // border-radius: 1.2rem 1.2rem 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 2rem;

  .stack {
    display: grid;
    gap: 1.6rem;
  }

  ${breakpoints.medium} {
    padding: 7.2rem 0;
  }
`;

export const imageGradient = css`
  background: blue; // linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
  margin-bottom: 2.4rem;
`;

export const pledge_button = css`
  display: grid;
  gap: 1.6rem;
`;

export const sectionButtons = css`
  padding: 2.8rem 0 6.8rem !important;
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
  text-transform: none !important;
  color: var(--font-02) !important;
  background-color: var(--surface-01) !important;
  font-family: var(--font-family);
  &:hover {
    opacity: 0.7; // same styles as of for CopyButton
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

export const pending = css`
  background-color: var(--surface-03);
  border-radius: 0.8rem;
  padding: 1.6rem;
  display: grid;
  gap: 0.8rem;
  justify-items: center;

  .spinnerTitle {
    display: flex;
    gap: 1.6rem;
  }
`;
