import { css, keyframes } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const backgroundContainer = css`
  min-height: calc(100vh - var(--header-height) - 10rem);
  align-content: start;
  grid-column: full;
  display: grid;
  grid-template-columns: inherit;
  padding-top: var(--header-height);
  background-color: var(--surface-02);
  position: relative;
  z-index: 0;
  ${breakpoints.desktop} {
    min-height: calc(100vh - 10rem);
    margin-top: calc(var(--header-height) * -1);
    padding-top: var(--header-height);
  }
`;

const float = keyframes`
    0% {
      transform: rotate(0deg) scale(1);
    }
    50% {
      transform: rotate(4deg) scale(1.5);
    }
    100% {
      transform: rotate(0deg) scale(1);
    }
`;

export const backgroundDecor = css`
  position: absolute;
  top: -50%;
  z-index: -1;
  right: 32%;
  rotate: 45deg;
  opacity: 0.3;
  animation: ${float} 90s linear infinite;
`;

export const radialGradient = css`
  z-index: -1;
  grid-column: main;
  opacity: 0.8;
  width: 50rem;
  height: 50rem;
  position: absolute;
  top: 16rem;
  left: 8rem;
  background: #0ba1ff;
  filter: blur(40rem);
`;

export const formSection = css`
  padding: 4.8rem 0rem;
  grid-column: main;
  display: grid;
  gap: 2.4rem;
  justify-items: center;
  ${breakpoints.large} {
    padding: 7.4rem;
    gap: 5.4rem;
  }
  p {
    max-width: 52rem;
  }

  p a {
    color: var(--klima-blue);
    text-decoration: underline;
  }

  b {
    color: var(--klima-green);
  }

  form {
    display: grid;
    gap: 3.2rem;
    width: 100%;
    max-width: 36rem;
  }
`;

export const pendingModalContent = css`
  display: grid;
  gap: 2.4rem;
  justify-items: center;
  padding-bottom: 2.4rem;
`;

export const ctaSection = css`
  grid-column: main;
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;
  padding: 1.6rem 0rem;
  ${breakpoints.large} {
    padding: 6.4rem 0rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  .infinityStack {
    display: grid;
    gap: 2.4rem;
  }
  .infinityLogo {
    max-width: 36rem;
    height: 100%;
    width: 100%;
  }
  .buttonStack {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    width: 100%;
    gap: 2.4rem;

    ${breakpoints.small} {
      flex-direction: row;
      width: auto;
      justify-content: center;
      align-items: center;
    }
  }
`;

const fadeIn = keyframes`
    0% {
      opacity: 0;
      transform: translateY(0.8rem);
    }
    100% {
      opacity: 1;
      transform: translateY(0rem);
    }
`;
export const animatedSuccessContainer = css`
  display: inherit;
  gap: inherit;
  justify-items: center;
  grid-template-columns: inherit;
  animation: ${fadeIn} 2s ease-in-out normal;
`;
export const buttonLinks = css`
  display: grid;
  gap: 1.6rem;
`;
