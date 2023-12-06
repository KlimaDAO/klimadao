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

export const downloadButton = css`
  background-color: var(--font-02) !important;
  color: var(--white);
  padding: 0 2rem;
  gap: 1.5rem;
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

export const spinner = css`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: scale(0.75);

  > div {
    color: var(--yellow);
  }
`;
