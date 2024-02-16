import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";
import * as typography from "@klimadao/lib/theme/typography";

export const pageWrapper = css`
  display: unset;
`;

export const section = css`
  padding-bottom: 0;
  ${breakpoints.medium} {
    padding-top: 11.8rem;
    padding-bottom: 0;
  }
`;

export const pageHeader = css`
  grid-column: main;
  display: grid;
  gap: 2.8rem;
  padding-bottom: 5rem;
  ${breakpoints.medium} {
    gap: 5.2rem;
  }
`;

export const headline = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2.8rem;
`;

export const subline = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 0.8rem;
`;

export const address = css`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  align-items: center;
  justify-content: center;
`;

export const copyButton = css`
  ${typography.body1}
  justify-self: start;
  gap: 0.4rem;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.7;
  }
`;

export const cards = css`
  grid-column: main;
  display: grid;
  gap: 2.8rem;
  padding-bottom: 5rem;

  ${breakpoints.medium} {
    grid-auto-columns: minmax(0, 1fr);
    grid-auto-flow: column;
  }
`;

export const card = css`
  display: grid;
  background-color: var(--surface-01);
  border-radius: 1.2rem;
  padding: 2.4rem;
  gap: 1.6rem;
  justify-content: center;
  align-content: center;

  ${breakpoints.desktop} {
    padding: 3.2rem;
  }

  .headline {
    display: flex;
    align-items: center;
    justify-content: center;
    align-content: center;
    gap: 1rem;
  }
`;

export const sectionButtons = css`
  padding: unset !important;
  grid-column: full;
`;

export const sectionButtonsWrap = css`
  grid-column: main;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 2.8rem;
  padding: 2.8rem 1.5rem;

  ${breakpoints.medium} {
    flex-direction: row;
  }
`;

export const largeCopyButton = css`
  font-size: inherit !important;
  text-transform: none;
`;
