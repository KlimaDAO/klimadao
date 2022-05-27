import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const summary = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  div > p {
    word-break: break-word;
  }

  ${breakpoints.medium} {
    justify-content: center;
    flex-direction: row;
  }
`;

export const footprintTotal = css`
  display: grid;
  align-items: start;
`;

export const categories = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const categoryRow = css`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  overflow: hidden;

  ${breakpoints.medium} {
    flex-direction: row;
  }

  p {
    font-size: 2rem;

    ${breakpoints.medium} {
      font-size: 2.4rem;
    }
  }
`;

export const categoryRow_name = css`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const catergoryRow_values = css`
  display: flex;
  flex-direction: row;
  white-space: nowrap;
`;

export const categoryRow_divider = css`
  color: var(--font-03);
`;

export const categoryRow_percentage = css`
  color: var(--klima-green);
`;

// Footprint skeleton
export const skeleton = css`
  height: 2.6rem;
  width: 24rem;
  border-radius: 0.6rem;
  background-color: var(--surface-01);
`;

export const skeleton_right = css`
  display: none;

  ${breakpoints.medium} {
    display: flex;
    gap: 1rem;
  }
`;

// Footprint charts
export const footprintChart_tooltip = css`
  background-color: var(--surface-01);
  padding: 0.8rem;
  border-radius: 0.6rem;
  border: 0.1rem solid var(--font-03);
`;
