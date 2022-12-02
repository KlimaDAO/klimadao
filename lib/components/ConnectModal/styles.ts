import { css } from "@emotion/css";
import breakpoints from "../../theme/breakpoints";

export const modalBackground = css`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const modalContainer = css`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 101;
  top: 0;
  left: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

export const walletButton = css`
  background: var(--white);
  display: flex;
  gap: 1.6rem;
  align-items: center;
  width: 100%;
  padding: 0.6rem 1.2rem;
  border-radius: 0.2rem;
  cursor: pointer;
  p {
    text-transform: uppercase;
  }
`;

export const buttonsContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  padding-top: 3.2rem;
`;

export const leftLine = css`
  width: 70px;
  height: 2px;
  opacity: 0.8;
  background: linear-gradient(270deg, #ffffff 0%, rgba(255, 255, 255, 0) 100%);
`;
export const rightLine = css`
  width: 70px;
  height: 2px;
  opacity: 0.8;
  background: linear-gradient(90deg, #ffffff 0%, rgba(255, 255, 255, 0) 97.86%);
`;

export const continueText = css`
  color: var(--white);
  text-transform: uppercase;
`;

export const continueBox = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 3.2rem 0;
`;

export const torusButtons = css`
  justify-content: center;
  display: flex;
  gap: 1.6rem;
`;
export const twitter = css`
  fill: #1d9bf0;
`;
export const discord = css`
  fill: #5865f2;
`;

export const spinner = css`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6rem;
`;

export const errorContent = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  padding-top: 2.4rem;
  button {
    width: 100%;
  }
  p {
    color: var(--white);
  }
`;

export const buttonBackground = css`
  height: 4rem;
  width: 4rem;
  background: var(--white);
  border-radius: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const modalContent = css`
  width: 38rem;
  max-width: 55rem;
  height: fit-content;
  max-height: calc(100vh - 10rem);
  overflow-y: auto;
  border-radius: 1.2rem;
  background-color: rgba(57, 57, 57, 1); // dark surface-04
  pointer-events: fill;
  margin: 2rem;
  gap: 1rem;
  padding: 1.6rem;
  animation: enter 250ms ease-in-out;
  animation-fill-mode: forwards;
  z-index: 999;
  ${breakpoints.medium} {
    padding: 2.4rem;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    text-transform: capitalize;
    p {
      color: var(--white);
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4rem;
      height: 4rem;
      padding: 1rem;
      border-radius: 0.4rem;
      color: var(--white);
      background-color: rgba(32, 32, 32, 1); // dark surface-02
    }
  }

  @keyframes enter {
    0% {
      opacity: 0;
      -webkit-transform: scale(0);
      transform: scale(0);
    }
    100% {
      opacity: 1;
      -webkit-transform: scale(1);
      transform: scale(1);
    }
  }
`;
