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

  .stack {
    display: grid;
    justify-items: start;
    gap: 0.8rem;
  }

  ${breakpoints.medium} {
    padding: 10rem 2rem;
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
  color: var(--white);
  word-break: break-word;
  font-weight: 600;
  z-index: 1;

  a {
    color: var(--klima-blue);
  }
`;

export const projectHeaderTags = css`
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
  gap: 1.6rem;
  align-items: center;
`;
