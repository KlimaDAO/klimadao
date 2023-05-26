import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const shareCard = css`
  gap: 0.8rem;
  padding: 2rem;
  display: flex;
  margin: 2rem 0;
  flex-direction: column;
  background-color: var(--surface-02);

  p {
    text-align: center;
  }

  ${breakpoints.desktop} {
    p {
      text-align: left;
    }
  }
`;

export const content = css`
  gap: 1.6rem;
  display: flex;
  align-items: center;
  flex-direction: column-reverse;

  button {
    width: 100%;
  }

  ${breakpoints.desktop} {
    flex-direction: row;
    margin-bottom: 1.4rem;

    button {
      width: auto;
    }
  }
`;

export const socialLinks = css`
  display: grid;
  gap: 2.4rem;
  justify-content: center;
  align-items: center;
  position: relative;
  grid-column: main;

  .title {
    text-align: center;
    position: relative;
    line-height: initial;
    color: white;
  }

  .buttons {
    display: flex;
    position: relative;
    justify-content: center;
    align-items: center;
    gap: 1.6rem;

    button {
      background-color: var(--font-02) !important;
      width: 5rem;
      height: 5rem;
      font-size: 2rem;
      padding: 1.5rem;
      svg {
        color: white;
        width: 2rem !important;
        height: 2rem !important;
      }
    }
  }
`;

export const profileLink = css`
  display: none;
  gap: 1.45rem;
  font-size: 1.4rem;
  line-height: 1.6rem;
  font-weight: 600;
  letter-spacing: 0.042rem;
  margin-top: 0.2rem;
  align-items: center;
  text-transform: uppercase;
  color: var(--bright-blue);
  font-family: var(--font-family-secondary);

  ${breakpoints.desktop} {
    display: flex;
  }
`;
