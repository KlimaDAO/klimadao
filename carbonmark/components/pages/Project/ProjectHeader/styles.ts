import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const projectHeader = css`
  position: relative;
  overflow: hidden;
  padding: 2.4rem 1.6rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
  gap: 2.5rem;
  margin: -1.6rem;
  max-height: 14rem;
  margin-bottom: 0.4rem;
  /* Don't overlap tippy popovers/tooltips */
  z-index: 0;

  .stack {
    display: grid;
    justify-items: start;
    gap: 0.8rem;
  }

  ${breakpoints.medium} {
    max-height: 24rem;
    padding: 7rem 2rem;
    margin-bottom: 0.8rem;
  }
`;

export const imageGradient = css`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const projectHeaderText = css`
  z-index: 1;
  color: var(--white);
  word-break: break-word;
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2rem;

  ${breakpoints.medium} {
    font-size: 3.2rem;
    line-height: 3.6rem;
  }
`;

export const sellerLink = css`
  color: var(--white);
  z-index: 1;
  text-decoration: underline;
  :visited {
    color: var(--white);
  }
`;
