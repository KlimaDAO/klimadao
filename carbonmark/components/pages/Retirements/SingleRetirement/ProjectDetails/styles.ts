import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const projectDetails = css`
  width: 100%;
  padding: 2rem 1.5rem;
  border: 1px solid var(--manatee);

  ${breakpoints.desktop} {
    padding: 3rem 3.5rem;
  }
`;

export const textGroup = css`
  gap: 0.8rem;
  margin: 2rem 0;
  display: flex;
  flex-direction: column;

  p > a {
    color: inherit;
    text-decoration: underline;
  }

  .description {
    white-space: pre-line;
  }
`;

export const imageWrapper = css`
  gap: 0.8rem;
  position: relative;
  overflow: hidden;
  grid-column: main;
  padding: 7.2rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
`;

export const placeholder = css`
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  position: absolute;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.2));
`;

export const officialText = css`
  gap: 1rem;
  display: flex;
  align-items: center;
  margin: 1rem 0 2.1rem;
`;

export const profileLink = css`
  display: flex;
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
`;

export const buttons = css`
  gap: 1.2rem;
  display: flex;
  margin-top: 3rem;
  flex-direction: column;

  ${breakpoints.desktop} {
    flex-direction: row;
  }

  & .copyButton {
    background-color: transparent !important;

    & svg path {
      fill: var(--font-02);
    }
  }

  & a,
  & .copyButton {
    width: 100%;
    border: 0.1rem solid;
    font-size: 1.4rem;
    border-radius: 0.4rem;
    min-height: 3.9rem;
    line-height: 1.6rem;
    letter-spacing: 0.03em;
    text-transform: uppercase;
    border-color: var(--font-03);
    color: var(--font-02) !important;
    font-family: var(--font-family-secondary);
  }
`;
