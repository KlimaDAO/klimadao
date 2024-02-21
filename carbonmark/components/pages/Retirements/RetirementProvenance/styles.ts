import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const pageWrapper = css`
  display: unset;
`;

export const section = css`
  padding-bottom: 3.6rem;
  display: flex;
  gap: 2rem;
  justify-content: center;
  ${breakpoints.desktop} {
    padding-top: 6.8rem;
    padding-bottom: 4rem;
  }
`;

export const content = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  align-items: center;
  text-align: center;
  max-width: min(100vw, 65rem);
  padding-left: 1.6rem;
  padding-right: 1.6rem;
  ${breakpoints.medium} {
    padding-top: 6.8rem;
    padding-bottom: 4rem;
  }
`;

export const title = css`
  font-family: Poppins;
`;

export const header = css`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  ${breakpoints.medium} {
    flex-direction: row;
  }
`;

export const social = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-bottom: 2rem;
  align-items: center;
`;

export const labelWithInfo = css`
  font-family: var(--font-family-secondary);
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;

  svg {
    color: var(--font-03);
    width: 2rem;
    height: 2rem;
  }
`;
