import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const label = css`
  display: flex;
  gap: 0.8rem;
  color: white;
  align-items: center;
`;

export const secondaryContainer = css`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

export const options = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 0.8rem;
  cursor: pointer;

  ${breakpoints.large} {
    flex-direction: row;
  }
`;

export const defaultText = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  padding: 3rem 2.8rem;
  border: 0.175rem solid var(--surface-03);
  border-radius: 0.8rem;

  svg {
    min-height: 4rem;
    min-width: 4rem;
    fill: var(--font-02);
  }
`;
