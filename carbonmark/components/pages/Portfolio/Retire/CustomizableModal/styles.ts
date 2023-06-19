import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const modalBackground = css`
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 100;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(2.5px);
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

export const modalContent = (
  width: string,
  maxWidth: string,
  height: string,
  maxHeight: string,
  overflowY: string
) => css`
  ${width >= maxWidth ? "" : `width: ${width};`};
  max-width: ${maxWidth};
  height: ${height};
  max-height: ${maxHeight};
  overflow-y: ${overflowY};
  border-radius: 1.2rem;
  background-color: var(--surface-01);
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
    margin-bottom: 1.6rem;
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4rem;
      height: 4rem;
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

  //Resolve border radius issues by enforcing rounded corners on scroll bars
  &::-webkit-scrollbar-thumb {
    background-color: var(--surface-04);
    border: 0.4rem solid transparent;
    border-radius: 0.8rem;
    background-clip: padding-box;
  }

  &::-webkit-scrollbar {
    width: 1.6rem;
  }
`;
