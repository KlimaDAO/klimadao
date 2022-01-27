import { css, keyframes } from "@emotion/css";

const pulse = keyframes`
  0% {
    filter: brightness(50%);

  }
  50% {
    filter: brightness(100%);
  }
  100% {
    filter: brightness(50%);
  }
`;

export const container = css`
    position: relative;
    margin: 0rem 3.2rem;
    border-radius: 1.6rem 1.6rem 0 0;
    overflow: hidden;
    border-radius:
    position: relative;
    min-height: 32rem;
    opacity: 05;
    animation: ${pulse} 6s ease-out infinite;
`;
