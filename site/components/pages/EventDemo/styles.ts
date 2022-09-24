import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const backgroundContainer = css`
  grid-column: full;
  display: grid;
  grid-template-columns: inherit;
  padding-top: var(--header-height);
  background-color: var(--surface-02);
  position: relative;
  z-index: 0;
  ${breakpoints.desktop} {
    margin-top: calc(var(--header-height) * -1);
    padding-top: var(--header-height);
  }
`;

export const backgroundDecor = css`
  position: absolute;
  top: -50%;
  z-index: -1;
  right: 32%;
  rotate: 45deg;
  opacity: 0.3;
`;

export const formSection = css`
  padding: 6.4rem 0rem;
  grid-column: main;
  display: grid;
  gap: 5.4rem;
  justify-items: center;
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
