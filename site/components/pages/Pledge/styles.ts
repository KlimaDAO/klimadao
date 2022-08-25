import { css } from "@emotion/css";

import heroImage from "./hero.jpg";
import bannerImage from "./banner.jpg";
import bgDots from "./bg-dots.svg";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const pageContainer = css`
  grid-column: full;
  min-height: 100vh;
  display: grid;
  align-content: start;
  grid-template-columns: inherit;
  background-color: var(--surface-01);

  background: url(${bgDots.src}) center 120px no-repeat;

  [data-theme="theme-dark"] & {
    background: url(${bgDots.src}) center 120px no-repeat,
      linear-gradient(165.47deg, #3d3d3d 3.96%, #1f1f1f 60.29%);
  }
`;

export const headerContainer = css`
  width: 100%;
  background-color: var(--surface-02);
  padding-bottom: 4rem;
  grid-column: full;
  display: grid;
  align-content: start;
  grid-template-columns: inherit;
`;

export const container = css`
  grid-column: main;
  display: flex;
  flex-direction: column;

  margin-bottom: 4rem;

  margin-top: 6rem;
  gap: 6rem;

  ${breakpoints.desktop} {
    margin-top: 12rem;
    gap: 12rem;
  }
`;

export const heroContainer = css`
  grid-column: full;

  padding: 0 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 2rem;

  gap: 6rem;

  ${breakpoints.desktop} {
    padding: 0 3.2rem;
  }
`;

export const hero = css`
  padding: 3.2rem 1.6rem;

  ${breakpoints.desktop} {
    min-height: 45rem;
    padding: 3.2rem;
  }

  max-width: 135rem;
  width: 100%;

  background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${heroImage.src}) center / cover;
  border-radius: 1.6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  .inner {
    max-width: 72rem;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 3.2rem;
  }

  .actions {
    display: flex;
    justify-content: center;

    > * + * {
      margin-left: 1.6rem;
    }
  }

  h1,
  p {
    color: white;
  }
`;

export const search = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3.2rem;

  form {
    display: flex;
    width: 100%;
    max-width: 65rem;
    gap: 1.6rem;

    div {
      flex-grow: 1;
    }

    .error {
      margin-top: 1rem;
      color: var(--warn);
    }
  }
`;

export const getStarted = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3.2rem;

  ol {
    ${breakpoints.large} {
      grid-template-columns: repeat(3, 1fr);
    }

    list-style: none;
    display: grid;
    grid-gap: 2rem;

    li {
      display: flex;
      flex-direction: column;
      gap: 1.6rem;
      .inner {
        flex-grow: 1;
        background-color: var(--surface-03);
        border-radius: 1.2rem;
        padding: 5rem 3.2rem;

        > * + * {
          margin-top: 1.6rem;
        }
      }
    }
  }
`;

export const banner = css`
  min-height: 18rem;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${bannerImage.src}) center / cover;
  border-radius: 1.6rem;

  display: flex;
  justify-content: center;
  align-items: center;

  .inner {
    max-width: 72rem;
    display: flex;
    flex-direction: column;
    align-items: center;

    gap: 3.2rem;
    padding: 1.6rem 3.2rem;

    ${breakpoints.desktop} {
      padding: 3.2rem;
    }
  }

  .actions {
    > * + * {
      margin-left: 1.6rem;
    }
  }

  h2 {
    color: white;
  }
`;
