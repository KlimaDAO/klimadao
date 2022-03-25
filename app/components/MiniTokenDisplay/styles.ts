import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  display: grid;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;

  .label {
    height: 2rem;
    text-transform: uppercase;
    ${breakpoints.medium} {
      justify-self: flex-start;
    }
  }
  .value.warn {
    color: var(--warn);
  }
`;

export const card = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: var(--surface-01);
  color: var(--font-01);
  height: 5.6rem;
  border-radius: 1rem;
  padding: 0.4rem 0.8rem;
  .image {
    min-width: 4.8rem;
  }
  p {
    padding: 0 0.6rem;
  }
`;
