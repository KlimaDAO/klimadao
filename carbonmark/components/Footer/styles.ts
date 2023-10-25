import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const footer = (transparent = false) => css`
  background: ${transparent ? "none" : "var(--manatee)"};
  grid-column: full;
  display: flex;
  flex-direction: column;
  gap: 4rem;
  padding: 4rem 1.6rem;

  ${breakpoints.desktop} {
    padding: 4rem;
    padding-bottom: 10rem;
    gap: 3rem;
  }

  ${breakpoints.desktopLarge} {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  a,
  a:visited {
    color: white;
  }
`;

export const footerNav = css`
  font-size: 1.4rem;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 2rem;

  ${breakpoints.desktop} {
    flex-direction: row;
    justify-content: space-between;
  }

  ${breakpoints.desktopLarge} {
    gap: 4rem;
  }
`;

export const footerIcons = css`
  display: flex;
  gap: 2rem;

  ${breakpoints.desktop} {
    justify-content: center;
  }

  svg {
    width: 2rem;
    height: 2rem;
  }

  & svg path {
    fill: #fff;
  }
`;
