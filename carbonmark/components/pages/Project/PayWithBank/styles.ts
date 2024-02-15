import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  grid-column: main;
  display: grid;
  grid-template-rows: auto auto 1fr;
  gap: 2.4rem;

  margin: 2.2rem 1.6rem;

  ${breakpoints.desktop} {
    margin: 4rem;
  }
`;

export const fullWidth = css`
  grid-column: full;
  display: grid;
  grid-template-columns: inherit;

  &.whiteBG {
    background-color: var(--white);
  }
`;

export const learnMoreButton = css`
  width: 100%;
  margin: 0 auto;

  ${breakpoints.desktop} {
    width: fit-content;
  }
`;

export const pageTitle = css`
  font-size: 4.8rem;
  font-weight: 700;
  text-align: center;
  font-family: var(--font-family-secondary);

  ${breakpoints.desktop} {
    font-size: 6rem;
  }
`;

export const pageDescription = css`
  margin: 0 auto;
  max-width: 72rem;
  text-align: left;

  ${breakpoints.desktop} {
    text-align: center;
  }
`;

export const cardContainer = css`
  margin: 0 auto;
  width: 100%;

  .warn {
    color: var(--warn);
  }

  ${breakpoints.desktop} {
    width: 72rem;
    margin-top: 1.6rem;
  }

  .form-container {
    gap: 1.6rem;
    display: grid;
    margin-top: 0.8rem;

    ${breakpoints.desktop} {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

export const successCard = css`
  width: 100%;
  margin: 0 auto;

  ${breakpoints.desktop} {
    width: 56rem;
  }

  > div {
    display: flex;
    gap: 2.4rem;
    padding: 4rem;
  }

  .title {
    gap: 0.8rem;
    display: flex;

    & > svg {
      width: 2.4rem;
      height: 2.4rem;
    }
  }

  .card-content {
    gap: 1.2rem;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background: var(--surface-02);
    border-radius: 0.8rem;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;

      & p:first-of-type {
        font-weight: 700;
      }
    }

    .break-word {
      word-break: break-word;
    }
  }
`;
