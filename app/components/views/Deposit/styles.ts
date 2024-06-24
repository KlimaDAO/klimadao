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
  border: 1px solid var(--font-03);
  border-radius: 0.4rem;
  padding: 1.6rem;

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
  }

  & .end {
    display: flex;
    padding-left: 2rem;
    flex-direction: column;
  }
`;

export const card = css`
  gap: 0 !important;
`;

export const titleText = css`
  font-weight: 700;
  font-size: 1.6rem !important;
  line-height: 2rem !important;
  color: var(--white);
`;

export const descriptionText = css`
  font-weight: 400;
  font-size: 1.4rem !important;
  line-height: 1.6rem !important;
  color: var(--font-03);
`;
