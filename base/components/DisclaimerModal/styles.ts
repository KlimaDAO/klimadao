import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const modal = css`
  gap: 0;
  width: 90%;
  height: auto;
  top: auto;
  bottom: auto;
  overflow-y: auto;

  div:first-of-type {
    p {
      font-weight: 600;
      font-size: 2.4rem;
      font-family: var(--font-family-secondary);
    }
  }

  ${breakpoints.medium} {
    width: 48rem;
    max-height: 100vh;
  }
`;

export const content = css`
  margin-top: 2rem;
  p {
    color: white !important;
    display: flex;
    font-size: 1.4rem;
    line-height: 1.6rem;
    margin-bottom: 1.2rem;
  }
`;

export const dislaimerButton = css`
  width: 100%;
  border: none;
  margin-top: 2.4rem;
  color: #fff !important;
`;
