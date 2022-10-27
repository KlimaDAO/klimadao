import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

import heroImage from "public/arctic.jpg";
import bannerImage from "public/brienz.jpg";
import dots from "public/dots.svg";

export const pageContainer = css`
  display: grid;
  grid-template-columns: inherit;
  grid-column: full;
  align-content: start;
  background-color: var(--surface-01);
  background: url(${dots.src}) center 120px no-repeat;
  min-height: 100vh;

  [data-theme="theme-dark"] & {
    background: url(${dots.src}) center 120px no-repeat,
      linear-gradient(165.47deg, #3d3d3d 3.96%, #1f1f1f 60.29%);
  }
`;

export const headerContainer = css`
  display: grid;
  grid-template-columns: inherit;
  grid-column: full;
  align-content: start;
  background-color: var(--surface-02);
  padding-bottom: 4rem;
  width: 100%;
`;

export const container = css`
  display: flex;
  grid-column: main;
  flex-direction: column;
  gap: 6rem;
  margin-top: 6rem;
  margin-bottom: 4rem;

  ${breakpoints.desktop} {
    gap: 12rem;
    margin-top: 12rem;
  }
`;

export const heroContainer = css`
  grid-column: full;
  padding: 0 1.6rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6rem;
  margin-top: 4rem;

  ${breakpoints.desktop} {
    margin-top: 2rem;
    padding: 0 3.2rem;
  `;

export const hero = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.6rem;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)),
    url(${heroImage.src}) center / cover;
  padding: 3.2rem 1.6rem;
  width: 100%;
  max-width: 135rem;

  ${breakpoints.desktop} {
    padding: 3.2rem;
    min-height: 45rem;
  }

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.2rem;
    max-width: 72rem;
  }

  .actions {
    display: flex;
    justify-content: center;
    gap: 1.6rem;
    flex-wrap: wrap;
  }

  h1,
  p {
    color: white;
  }
`;

export const search = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;

  form {
    display: flex;
    gap: 1.6rem;
    width: 100%;
    max-width: 65rem;

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
  flex-direction: column;
  align-items: center;
  gap: 3.2rem;

  ol {
    ${breakpoints.large} {
      grid-template-columns: repeat(3, 1fr);
    }

    grid-gap: 2rem;
    display: grid;
    list-style: none;

    li {
      display: flex;
      flex-direction: column;
      gap: 1.6rem;

      .inner {
        flex-grow: 1;
        border-radius: 1.2rem;
        background-color: var(--surface-03);
        padding: 5rem 3.2rem;

        h3 {
          margin-bottom: 1.6rem;
        }
      }
    }
  }
`;

export const banner = css`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 1.6rem;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),
    url(${bannerImage.src}) center / cover;
  min-height: 18rem;

  .inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3.2rem;
    padding: 1.6rem 3.2rem;
    max-width: 72rem;

    ${breakpoints.desktop} {
      padding: 3.2rem;
    }
  }

  h2 {
    color: white;
  }
`;
