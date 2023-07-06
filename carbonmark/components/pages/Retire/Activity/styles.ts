import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const spinnerContainer = css`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 1.2rem;
`;

export const listHeader = css`
  display: grid;
  grid-template-columns: 6fr 0.5fr 1.5fr;
  grid-column-gap: 0.8rem;
  grid-row-gap: 0.8rem;

  padding: 0.8rem;

  background: var(--manatee);

  p {
    color: white;
    text-transform: uppercase;
  }
`;

export const list = css`
  padding: 0.8rem;
`;

export const listItem = css`
  display: grid;
  grid-template-columns: 6fr 0.5fr 1.5fr;
  grid-column-gap: 1.2rem;
  grid-row-gap: 0.8rem;
  padding: 0.8rem;

  border-bottom: 0.5px solid var(--manatee);

  transition: all 0.2s ease 0s;

  &:hover {
    transform: scale(1.01);
    background: var(--surface-02);
  }
`;

export const emptyList = css`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 1fr);
  grid-column-gap: 0.4rem;
  grid-row-gap: 0.8rem;
  padding: 0.8rem;

  .error {
    color: var(--warn);
  }
`;

export const totalsText = css`
  display: grid;
  gap: 0.8rem;

  .error {
    color: var(--warn);
  }
`;

export const externalLink = css`
  text-decoration: none;
  display: flex;
  gap: 0.4rem;
  align-items: center;
  color: var(--bright-blue);
  text-transform: uppercase;

  margin-top: 2rem;

  &:hover,
  &:visited {
    text-decoration: underline;
  }
`;

export const showOnDesktop = css`
  display: none;
  ${breakpoints.large} {
    display: initial;
  }
`;

export const hideOnDesktop = css`
  ${breakpoints.large} {
    display: none;
  }
`;

export const activityQuote = css`
  border-left: 2px solid var(--surface-04);
  padding: 1.2rem;
  display: grid;
  gap: 0.8rem;

  .number {
    padding: 0.4rem 0.8rem;
    background-color: var(--surface-02);
  }

  .account {
    color: var(--bright-blue);
    font-weight: 600;
  }

  &:hover {
    background: var(--surface-02);
  }
`;

export const activityQuotes = css`
  display: grid;
  gap: 2rem;
`;
