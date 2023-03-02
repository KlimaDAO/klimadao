import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const footer = (transparent = false) => css`
  background: ${transparent ? "none" : "var(--manatee)"};
  grid-column: 1/4;
  padding: 2.8rem 0;
  display: grid;
  grid-template-columns: inherit;
  height: unset;
  width: 100%;
  nav {
    max-height: unset;
    width: 100%;
    justify-content: flex-start;
    flex-direction: row;
  }

  ${breakpoints.medium} {
    padding: 4.8rem 0;
    nav {
      justify-content: space-between;
      width: unset;
    }
  }
`;

export const footer_content = css`
  display: flex;
  flex-direction: column;
  grid-column: main;
  align-items: center;
  gap: 5rem;
  justify-content: space-between;
  height: 100%;

  ${breakpoints.medium} {
    justify-content: center;
  }

  ${breakpoints.large} {
    flex-direction: row;
    justify-content: space-between;
  }
`;

export const footer_nav = css`
  font-size: 1.4rem;
  max-height: 12rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;

  p {
    color: white;
  }
  a {
    // Full width link on mobile
    width: 100%;
    ${breakpoints.medium} {
      width: auto;
    }
  }

  & a {
    color: var(--font-02) !important;
    &:hover {
      color: var(--font-01) !important;
    }
  }
  ${breakpoints.large} {
    gap: 4;
    flex-direction: column;
  }

  ${breakpoints.desktop} {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 1.6rem 4rem;
  }
`;

export const footer_icons = css`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 1.6rem;
  flex-wrap: wrap;

  svg {
    width: 1.6rem;
  }

  & svg path {
    fill: white;
  }

  & svg:hover path {
    fill: white;
  }

  ${breakpoints.medium} {
    flex-direction: row;
    svg {
      width: 1.8rem;
    }
  }
`;
