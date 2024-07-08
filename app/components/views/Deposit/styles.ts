import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const offsetCard = css`
  ${breakpoints.desktop} {
    grid-row: 2;
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

export const card = css`
  grid-template-rows: unset !important;

  ${breakpoints.desktop} {
    grid-row: 2 / span 2;
  }
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
