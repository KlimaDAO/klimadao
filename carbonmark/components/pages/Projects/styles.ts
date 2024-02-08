import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const FIVE_CARD_WIDTH = "168rem";

export const dropdown = css`
  width: 23.7rem;
  text-align: left;
  button {
    width: 100%;
    background-color: white;
  }

  & .tippy-content div > div {
    background-color: white;
  }
`;

export const card = css`
  background-color: var(--surface-01);
  border-radius: var(--border-radius);
  box-shadow: var(--shadow-01);
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  ${breakpoints.medium} {
    max-width: 32rem;
    max-height: 36rem;
  }
  ${breakpoints.large} {
    transition: all 0.2s ease 0s;
    &:hover {
      transform: scale(1.02);
      box-shadow: var(--shadow-02);
    }
  }
`;

export const cardDescription = css`
  background: linear-gradient(
    180deg,
    var(--font-01) 43.44%,
    rgba(49, 49, 49, 0) 92.91%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  overflow: hidden;

  max-height: 9rem;
`;

export const cardTitle = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const cardImage = css`
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 12rem;
  border-radius: var(--border-radius) var(--border-radius) 0 0;
`;

export const cardContent = css`
  padding: 2rem;
  display: grid;
  gap: 0.8rem;
  grid-template-rows: auto auto 1fr;
`;

export const projectsList = css`
  // grid-column: full;
  justify-self: center;
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  // max-width: ${FIVE_CARD_WIDTH};
  margin-top: 3rem;

  ${breakpoints.large} {
    // max-width: fit-content;
  }
`;

export const viewContainer = css`
  grid-column: full;
`;

export const marketplace = css`
  display: flex;
  width: 100% !important;
  max-width: 100% !important;
  flex-direction: column;
`;

export const featureBanner = css`
  &:has(.feature-banner):not(.initial-banner) {
    padding: 17rem 2.4rem;
  }

  &:has(.feature-banner.initial-banner) {
    padding: 20rem 2.4rem;
  }

  // required for feature banner transition
  transition: all 0.2s ease-in-out;

  ${breakpoints.desktop} {
    &:has(.feature-banner.initial-banner),
    &:has(.feature-banner):not(.initial-banner) {
      padding: 16rem 2.4rem;
    }
  }
`;
