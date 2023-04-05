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

export const connectContent = css`
  display: flex;
  flex-direction: column;
`;

export const walletButton = css`
  background: var(--surface-02);
  display: flex;
  gap: 1.6rem;
  align-items: center;
  width: 100%;
  padding: 0.6rem 1.2rem;
  border-radius: 0.2rem;
  cursor: pointer;
  p {
    text-transform: uppercase;
    color: var(--font-01);
  }
`;

export const walletButtonCircle = css`
  ${walletButton}
  background: #0019FF; // --bright-blue
  p {
    color: white;
  }
`;

export const browserWalletIcon = css`
  width: 3.6rem;
  height: 3.6rem;
`;

export const buttonsContainer = css`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  padding-top: 1.6rem;
`;

export const leftLine = css`
  width: 7rem;
  height: 0.1rem;
  opacity: 0.8;
  background: linear-gradient(
    270deg,
    var(--font-02) 0%,
    rgba(98, 98, 102, 0) 100%
  );
`;
export const rightLine = css`
  width: 7rem;
  height: 0.1rem;
  opacity: 0.8;
  background: linear-gradient(
    90deg,
    var(--font-02) 0%,
    rgba(98, 98, 102, 0) 100%
  );
`;

export const textBox = css`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  padding: 0.8rem 0;
`;

export const torusButtons = css`
  justify-content: center;
  display: flex;
  gap: 1.6rem;
  cursor: pointer;
  background-color: var(--surface-02);
  border-radius: 0.4rem;
  padding: 0.6rem 2.4rem;
  font-size: 1.6rem;
`;

export const twitter = css`
  fill: #1d9bf0;
`;

export const discord = css`
  fill: #5865f2;
`;

export const email = css`
  .MuiSvgIcon-root {
    fill: #767676;
  }
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
  box-shadow: var(--shadow-01);
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    text-transform: capitalize;
    padding-bottom: 1.2rem;
    p {
      color: var(--font-01);
    }
    button {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 4rem;
      height: 4rem;
      padding: 1rem;
      border-radius: 0.4rem;
      color: #000;
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

export const errorButton = css`
  background-color: #0019ff; // bright-blue, same in dark/light mode
  color: #fff !important; // same in dark/light mode
`;

// typography
export const h3 = css`
  font-family: var(--font-family-secondary);
  font-size: 2.4rem;
  line-height: 2.8rem;
  font-weight: 600;
  /* ${breakpoints.large} {
    font-size: 3.2rem;
    line-height: 3.6rem;
  } */
`;

export const button = css`
  font-family: var(--font-family-secondary);
  text-transform: uppercase;
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.042rem;
`;

export const subText = css`
  color: var(--font-02);
  ${button}
`;

export const body1 = css`
  font-family: var(--font-family);
  font-size: 1.6rem;
  line-height: 2rem;
  letter-spacing: 0.016rem;
`;
export const closeButton = css`
  svg {
    fill: var(--font-01);
  }
`;
