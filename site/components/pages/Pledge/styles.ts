import { css } from "@emotion/css";

import heroImage from "./hero.jpg";
import bannerImage from "./banner.jpg";

export const container = css`
  grid-column: main;
  display: flex;
  flex-direction: column;

  margin-top: 12rem;

  gap: 12rem;
`;

export const heroContainer = css`
  grid-column: full;

  padding: 0 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  margin-top: 4rem;

  gap: 6rem;
`;

export const hero = css`
  padding: 3.2rem;
  max-width: 135rem;
  width: 100%;
  min-height: 45rem;
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
    width: 65rem;
    gap: 1.6rem;

    div {
      flex-grow: 1;
    }
  }
`;

export const getStarted = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 3.2rem;

  ol {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
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
