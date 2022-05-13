import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const retirementHeader = css`
  position: relative;
  overflow: hidden;
  grid-column: main;
  padding: 2.5rem 0;
  border-radius: 1.2rem 1.2rem 0 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2.5rem;

  ${breakpoints.medium} {
    padding: 10rem 0;
  }
`;

export const retirementHeaderText = css`
  color: var(--white);
  word-break: break-word;
  z-index: 1;
`;

export const imageGradient = css`
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const leafImage = css`
  z-index: 1;
`;
