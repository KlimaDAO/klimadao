import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const footprintTotal = css`
  display: grid;
  gap: 1rem;
`;

export const categories = css`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const categoryRow = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: column;

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
  text-overflow: ellipsis;
`;

export const categoryRow_divider = css`
  color: var(--font-03);
`;

export const categoryRow_percentage = css`
  color: var(--klima-green);
`;

export const skeleton = css`
  height: 2.6rem;
  width: 24rem;
  border-radius: 0.6rem;
  background-color: var(--surface-01);
`;

export const skeleton_right = css`
  display: flex;
  gap: 1rem;
`;
