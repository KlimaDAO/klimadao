import { css, keyframes } from "@emotion/css";

const pulse = keyframes`
  0% {
    filter: brightness(50%);

  }
  50% {
    filter: brightness(150%);
  }
  100% {
    filter: brightness(50%);
  }
`;

export const container = css`
  position: relative;
  border-radius: 2.4rem 2.4rem 0 0;
  overflow: hidden;
  position: relative;
  min-height: 32rem;
  opacity: 05;
  animation: ${pulse} 6s ease-out infinite;
`;
