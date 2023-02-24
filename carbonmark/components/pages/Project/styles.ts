import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const fullWidth = css`
  grid-column: 1 / 3;
`;

export const backToResults = css`
  color: var(--font-01) !important;

  svg {
    margin-right: 0.8rem;
  }
`;

export const listingsHeader = css`
  display: grid;
  gap: 1.2rem;
  grid-column: 1 / 3;
  align-items: center;
`;

export const mapContainer = css`
  display: grid;
  height: 100%;
  min-height: 32rem;
  min-width: 100%;
  width: 100%;
`;

export const descriptionContainer = css`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const row = css`
  display: grid;
  gap: 4rem;
  grid-column: 1/3;
  grid-template-rows: 1fr;
  ${breakpoints.large} {
    grid-template-rows: auto;
  }
  &.hasMap {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    ${breakpoints.large} {
      grid-template-rows: 1fr;
      grid-template-columns: 1fr 1fr;
    }
  }
`;

export const hasMap = css``;

export const listings = css`
  display: grid;
  gap: 2rem;
  grid-column: 1 / 3;
`;

export const projectHeader = css`
  position: relative;
  overflow: hidden;
  padding: 2.4rem 1.6rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 2.5rem;

  .stack {
    display: grid;
    gap: 1.6rem;
  }

  ${breakpoints.medium} {
    padding: 6rem 2rem;
  }
`;

export const imageGradient = css`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const projectHeaderText = css`
  color: var(--white);
  word-break: break-word;
  font-size: 1.4rem;
  font-weight: 600;
  z-index: 1;

  a {
    color: var(--klima-blue);
  }
`;

export const tags = css`
  display: flex;
  gap: 1.6rem;
  flex-direction: row;
  z-index: 1;
  align-items: center;
`;

export const meta = css`
  grid-column: 1 / 3;
  display: flex;
  justify-content: space-between;

  .best-price {
    display: flex;
    gap: 1.2rem;
    flex-direction: column;
    ${breakpoints.medium} {
      flex-direction: row;
      align-items: center;
    }
  }

  .badge {
    padding: 0.4rem 0.8rem;
    background-color: var(--yellow);
    align-items: center;
    align-self: flex-start;
    border-radius: var(--border-radius);
  }
`;
