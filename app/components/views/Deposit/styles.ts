import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const card = css`
  position: relative;
  display: grid;
  background-color: var(--surface-02);
  border-radius: 1.2rem;
  padding: 2.4rem;
  gap: 2.4rem;
  align-content: start;
  grid-column: 1 / 3;
  grid-template-rows: unset !important;

  .hr {
    height: 2px;
    background-color: var(--surface-01);
  }

  ${breakpoints.medium} {
    gap: 3.2rem;
  }

  ${breakpoints.desktop} {
    grid-column: cardsleft;
    grid-row: 2 / span 2;
    gap: 4rem;
    grid-template-rows: 1fr 1fr 1fr;
    align-items: start;
  }

  ${breakpoints.desktopLarge} {
    padding: 3.2rem;
  }
`;

export const grid = css`
  margin-top: 1rem;
  display: grid;
  border: 0.1rem solid var(--font-03);
  border-radius: 0.4rem;
  padding: 1.2rem;

  &.cols-3 {
    grid-template-columns: 1fr 0.1rem 1fr;
  }

  &.cols-5 {
    grid-template-columns: 1fr 0.1rem 0.75fr 0.1rem 1fr;
  }

  & .divider {
    width: 0.1rem;
    height: 100%;
    background: var(--font-03);
  }

  & .start {
    gap: 0.8rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 2rem;

    &[aria-label="bct-icon"] {
      justify-content: flex-start;
    }

    & [aria-label="title"] {
      gap: 0.8rem;
      display: flex;
      flex-direction: column;
    }
  }

  & .end {
    gap: 0.8rem;
    display: flex;
    padding-left: 2rem;
    flex-direction: column;
    justify-content: space-between;
  }
`;

export const input = css`
  width: 12.6rem;
  height: 2.7rem;
  padding: 0 0.4rem;
  font-weight: 700;
  border-radius: 0.4rem;
  border: 0.2rem solid var(--white);
`;

export const balanceErrorText = css`
  color: var(--warn);
`;

export const inputError = css`
  border-color: var(--warn);
`;

export const stakeCardRow = css`
  gap: 0.8rem;
  display: flex;
  flex-direction: column;
`;

export const titleText = css`
  font-weight: 700;
  font-size: 1.6rem !important;
  line-height: 2rem !important;
  color: var(--white);
  margin: 0.4rem 0 0;
`;

export const descriptionText = css`
  font-weight: 400;
  font-size: 1.4rem !important;
  line-height: 1.6rem !important;
  color: var(--font-03);
`;

export const depositButton = css`
  width: max-content;
`;

export const cardTitle = css`
  gap: 1.2rem;
  display: flex;
  align-items: center;
  font-family: var(--font-family-secondary);
`;

export const headerTitle = css`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;
