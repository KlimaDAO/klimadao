import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const retirementHeader = css`
  position: relative;
  overflow: hidden;
  grid-column: main;
  padding: 2rem 0;
  border-radius: 1.2rem 1.2rem 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2.5rem;

  ${breakpoints.medium} {
    padding: 8rem 0;
  }
`;

export const retirementHeaderText = css`
  color: var(--white);
  word-break: break-word;
  z-index: 1;
`;
