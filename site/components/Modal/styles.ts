import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const modalBackground = css`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 3;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
`;

export const modalContainer = css`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 4;
  top: 0;
  left: 0;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const modalContent = css`
  width: 50rem;
  max-width: 50rem;
  border-radius: 1.2rem;
  background-color: var(--surface-01);
  pointer-events: fill;
  margin: 2rem;
  gap: 1rem;
  padding: 1.6rem;
  animation: enter 250ms ease-in-out;
  animation-fill-mode: forwards;

  ${breakpoints.medium} {
    padding: 2.4rem;
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    text-transform: uppercase;

    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 3.2rem;
      height: 3.2rem;
      padding: 1rem;
      border-radius: 0.4rem;
      background-color: var(--surface-02);
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
