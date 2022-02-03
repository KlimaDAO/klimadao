import { css, keyframes } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

const pulse = keyframes`
  0% {
    filter: brightness(50%);

  }
  30% {
    filter: brightness(140%);
  }
  75% {
    filter: brightness(50%);
  }
  100% {
    filter: brightness(50%);
  }
`;

export const container = css`
  position: relative;
  overflow: hidden;
  position: relative;
  min-height: 32rem;
  opacity: 05;
  animation: ${pulse} 6s ease-in-out infinite;
  grid-column: full;
  ${breakpoints.medium} {
    grid-column: main;
    border-radius: 2.4rem 2.4rem 0 0;
  }
`;
