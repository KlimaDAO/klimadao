import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const pageWrapper = css`
  display: unset !important;
`;

export const container = css`
  grid-column: full;
  grid-template-columns: inherit;
  background-color: var(--surface-02);
  color: var(--font-01);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 2rem;
`;

export const backNavLink = css`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  color: var(--font-02) !important;
  margin: 2.4rem 0rem;
  font-size: 1.4rem;

  :hover {
    color: var(--font-01) !important;
  }

  ${breakpoints.large} {
    margin: 2.4rem 0rem;
    font-size: 1.6rem;
  }
`;

export const banner = css`
  position: relative;
  max-width: 114rem;
  margin-top: var(--header-height);
  width: 100%;

  ${breakpoints.large} {
    margin-top: 0;
    position: relative;
    padding: 3.2rem;
    padding-bottom: 0;
  }
`;

export const bannerImage = css`
  height: 18rem;
  position: relative;

  ${breakpoints.large} {
    height: 28rem;
  }
`;

export const blogContainer = css`
  display: grid;
  grid-template-columns: inherit;
  line-height: 166%;
  padding-bottom: 4.8rem;

  ${breakpoints.large} {
    padding-bottom: 6.4rem;
  }
`;

export const content = css`
  grid-column: main;
  max-width: 76rem;
  justify-self: auto;
  overflow-wrap: break-word;

  ${breakpoints.large} {
    justify-self: center;
    overflow-wrap: unset;
  }
`;

export const date = css`
  margin: 2.4rem 0;
  color: var(--manatee) !important;
`;

export const fallbackContainer = css`
  display: grid;
  flex: auto;
`;

export const loadingArticle = css`
  justify-self: center;
  align-self: center;
`;
export const disclaimer = css`
  margin-top: 4rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  font-style: italic;
`;
