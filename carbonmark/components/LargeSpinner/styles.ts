import { css, keyframes } from "@emotion/css";

const rotate = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const spinner = css`
  position: relative;
  width: 120px;
  height: 120px;
  border: 6px solid lightgray; /* Faint outline */
  border-radius: 50%;

  &:before {
    content: "";
    position: absolute;
    top: -6px;
    left: -6px;
    right: -6px;
    bottom: -6px;
    border: 6px solid gray;
    border-color: gray transparent transparent;
    border-radius: 50%;
    animation: ${rotate} 1.2s linear infinite;
  }
`;
