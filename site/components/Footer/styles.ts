import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const footer = css`
  background-color: var(--surface-02);
  grid-column: full;
  padding: 2rem 2.4rem;
  position: relative;
  grid-column: full;

  ${breakpoints.large} {
    padding: 4.8rem 2.4rem;
    display: grid;
    grid-template-columns: inherit;
  }
`;

export const footer_content = css`
  grid-column: main;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1;

  ${breakpoints.large} {
    text-align: center;
  }
`;

export const footer_nav = css`
  font-size: 1.4rem;
  display: grid;
  gap: 1.6rem 3.2rem;
  max-height: 12rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  & a {
    color: var(--font-02) !important;
  }

  & a:hover {
    color: var(--font-01) !important;
  }

  ${breakpoints.large} {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
`;

export const footer_icons = css`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 2rem;

  & a {
    margin: 0 1rem;
  }

  & svg path {
    fill: var(--font-02);
  }

  & svg:hover path {
    fill: var(--font-01);
  }

  & .discordIcon {
    width: 2rem;
    height: 2rem;
  }

  ${breakpoints.medium} {
    flex-direction: row;
    gap: 1rem;
  }
`;
