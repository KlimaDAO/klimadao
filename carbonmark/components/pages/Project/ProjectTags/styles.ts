import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const projectHeaderSubText = css`
  color: var(--white);
  word-break: break-word;
  font-family: var(--font-family-secondary);
  font-weight: 700;
  font-size: 1.6rem;
  line-height: 2rem;

  a {
    color: var(--klima-blue);
  }

  ${breakpoints.medium} {
    font-size: 2rem;
    line-height: 2.8rem;
  }
`;

export const projectHeaderTags = css`
  display: flex;
  flex-wrap: wrap;
  z-index: 1;
  gap: 1.6rem;
  align-items: center;
`;

export const tag = css`
  display: flex;
  gap: 0.4rem;
  flex-direction: column;
  border-radius: var(--border-radius);
  padding: 0.4rem 0.8rem;
  background-color: var(--surface-02);
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  border: 1px solid var(--font-03);
  font-size: 1.4rem;
  height: 2.6rem;
`;

