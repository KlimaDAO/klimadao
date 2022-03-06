import { css } from "@emotion/css";
import breakpoints from "@klimadao/lib/theme/breakpoints";

export const container = css`
  grid-column: full;
  grid-template-columns: inherit;
  background-color: var(--surface-02);
  color: var(--font-01);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const banner = css`
  position: relative;
  max-width: 114rem;
  width: 100%;

  ${breakpoints.large} {
    position: relative;
    padding: 3.2rem 3.2rem 0rem;
  }
`

export const bannerImage = css`
  height: 20rem;
  position: relative;

  ${breakpoints.large} {
    height: 28rem;
  }
`
export const blogContainer = css`
  padding: 4.8rem 0;
  line-height: 166%;
  display: grid;
  grid-template-columns: inherit;

  ${breakpoints.large} {
    padding: 6.4rem 0;
  }
`

export const content = css`
  grid-column: main;
  max-width: 76rem;
  justify-self: center;
`

export const date = css`
  margin: 2.4rem 0;
  color: var(--font-03) !important;
`

export const fallbackContainer = css`
  display: grid;
  flex: auto;
`
export const loadingArticle = css`
  justify-self: center;
  align-self: center;
`