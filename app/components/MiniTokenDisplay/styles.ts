import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  display: grid;
  flex-direction: column;
  width: 100%;
  gap: 0.6rem;

  .label {
    height: 2rem;

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

  .icon {
    min-width: 4.8rem;
    align-self: center;
    object-fit: contain;
  }

  p {
    padding: 0 0.6rem;
  }
`;
